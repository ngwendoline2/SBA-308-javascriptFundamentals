// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

console.log (CourseInfo)
// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

let getLearnerData = (course, ag, submission) => {
  const result = [];

  try {
    const courseID = course.id;
    if (courseID !== ag.course_id) {
      throw new Error(
        `Invalid course ID. Expected ${courseID}, but your assignment group is in ${ag.course_id}.`
      );
    }

    const learnerMap = new Map();
    for (let i = 0; i < submission.length; i++) {
      let learnerID = submission[i].learner_id;
      let assignmentID = submission[i].assignment_id;
      let submissionVar = submission[i].submission;
      let submittedDate = submission[i].submission.submitted_at;
      let learnerScore = submission[i].submission.score;
      if (!learnerMap.has(learnerID)) {
        // If doesn't exist in Map
        learnerMap.set(learnerID, [[assignmentID, submissionVar]]);
      } else {
        // If does exist in Map
        learnerMap.get(learnerID).push([assignmentID, submissionVar]);
      }
    }

    learnerMap.forEach((value, key) => {
      let student = {};
      student["id"] = key;
      student["avg"] = 0;
      let total_score = 0;
      let total_possible_score = 0;

      for (let j = 0; j < value.length; j++) {
        // console.log(value[j]);
        const submittedAtDate = new Date(value[j][1].submitted_at);

        const dueAtDate = new Date(ag.assignments[value[j][0] - 1].due_at);

        const currentDate = new Date();

        try {
          if (dueAtDate < currentDate) {
            let learnerAssignId = value[j][0];
            let assignmentId = ag.assignments[value[j][0] - 1].id;
            let pointsPossible =
              ag.assignments[value[j][0] - 1].points_possible;
            let submissionScore = value[j][1].score;

            student[`${value[j][0]}`] = submissionScore / pointsPossible;

            if (learnerAssignId === assignmentId) {
              if (submittedAtDate > dueAtDate) {
                // Returns a decimal to the nearest hundredth, uses parseFloat() to convert back to a number
                // Can use Number() or +() instead of parseFloat() in this scenerio
                student[`${value[j][0]}`] = parseFloat(
                  ((submissionScore / pointsPossible) * 0.9).toFixed(2)
                );
                total_score += submissionScore * 0.9;
                total_possible_score += pointsPossible;
              } else {
                total_score += submissionScore;
                total_possible_score += pointsPossible;
              }
            }
          }
        } catch (error) {
          console.error("Error processing data:", error.message);
          break;
        }
      }

      student["avg"] = total_score / total_possible_score;
      result.push(student);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
  return result;
};

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
try {
  if (result.length !== 0) {
    console.log(result);
  }
} catch (error) {
  console.log(`Error: ${error.message}`);
}