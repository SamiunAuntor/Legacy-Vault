const User = require("../user/user.model");

const Claim = require("../claim/claim.model");

const Successor = require("../successor/successor.model");

const getDashboardStats = async () => {
    const totalUsers =
        await User.countDocuments();

    const totalClaims =
        await Claim.countDocuments();

    const pendingClaims =
        await Claim.countDocuments({
            status: "UNDER_REVIEW",
        });

    const approvedClaims =
        await Claim.countDocuments({
            status: "APPROVED",
        });

    return {
        totalUsers,
        totalClaims,
        pendingClaims,
        approvedClaims,
    };
};

const getPendingClaims = async () => {
    return await Claim.find({
        status: "UNDER_REVIEW",
    })
        .populate("ownerId")
        .populate("successorId");
};

const approveClaim = async (claimId, adminId) => {
    const claim =
        await Claim.findById(claimId);

    if (!claim) {
        throw new Error(
            "Claim not found"
        );
    }

    if (
        claim.status !==
        "UNDER_REVIEW"
    ) {
        throw new Error(
            "Claim already processed"
        );
    }

    claim.status = "APPROVED";

    claim.reviewedBy =
        adminId;

    claim.reviewedAt =
        new Date();

    await claim.save();

    await Successor.findByIdAndUpdate(
        claim.successorId,
        {
            vaultAccessGranted: true,

            accessGrantedAt:
                new Date(),

            isVerified: true,
        }
    );

    return claim;
};

const rejectClaim = async (claimId, adminId, reason) => {
    const claim = await Claim.findById(claimId);

    if (!claim) {
        throw new Error(
            "Claim not found"
        );
    }

    claim.status = "REJECTED";

    claim.reviewedBy = adminId;

    claim.reviewedAt = new Date();

    claim.reviewNote = reason;

    await claim.save();

    return claim;
};

module.exports = {
    getDashboardStats,
    getPendingClaims,
    approveClaim,
    rejectClaim,
};