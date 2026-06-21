const questionService = require("./question.service");

const createQuestion = async (req, res, next) => {
    try {
        const result =
            await questionService.createQuestion(
                req.user._id,
                req.body
            );

        res.status(201).json({
            success: true,
            message:
                "Question created successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getMyQuestions = async (req, res, next) => {
    try {
        const result =
            await questionService.getMyQuestions(
                req.user._id
            );

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const deleteQuestion = async (req, res, next) => {
    try {
        await questionService.deleteQuestion(
            req.user._id,
            req.params.id
        );

        res.status(200).json({
            success: true,
            message:
                "Question deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createQuestion,
    getMyQuestions,
    deleteQuestion,
};