const bcrypt = require("bcryptjs");

const verifyAnswers = async (questions, answers) => {
    let correct = 0;

    for (const question of questions) {
        const submittedAnswer =
            answers.find(
                answer =>
                    answer.questionId ===
                    question._id.toString()
            );

        if (!submittedAnswer) continue;

        const isCorrect =
            await bcrypt.compare(
                submittedAnswer.answer,
                question.answerHash
            );

        if (isCorrect) {
            correct++;
        }
    }

    const total = questions.length;

    const score = Math.round(
        (correct / total) * 100
    );

    return {
        score,
        correct,
        total,
    };
};

module.exports = verifyAnswers;