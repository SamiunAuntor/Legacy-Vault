const adminService = require("./admin.service");

const getDashboard = async (req, res, next) => {
    try {
        const data =
            await adminService.getDashboardStats();

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboard,
};