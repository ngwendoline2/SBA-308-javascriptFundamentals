
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Homework",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "English",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }


  function getLearnerData(courseInfo, assignmentGroup, LearnerSubmissions) 
//Validate assignmentGroup belong to the correct course
    if (assignmentGroup.course_id !== courseInfo.id) {
        throw new Error("AssignmentGroup does not belong to the specified course.");
    }

    // Validate points_possible is not 0
    if (assignmentGroup.group_weight === 0) {
        throw new Error("Invalid data: group_weight \cannot be 0.");
    }

    // We will filter the assignments that are not yet due
    const now = new Date();
    const validateAssignments = assignmentGroup.assignments.filter((assignment) => {
        return assignment.due_at && new Date(assignment.due_at)  now;
    });

// we calculate weighted average for each learner
const learnerData = [];
LearnerSubmissions.forEach((submission) => {
    const assignment = validateAssignments.find((a) => a.id === submission.assignment_id);
    
    if (assignment) {
        // check for late submission
        const latePenalty = su.submission.submitted_at > a.due_at ? 0.1 : 0;

        //Calculate adjusted score
        const adjustedScore = submission.submission.score * (1 - latePenalty);

        // We calculate percentage score
        const percentageScore = (adjustedScore / assignment.points_possible) * 100;

        // We add entery to learnerData
        learnerData.push({
            learner_id: submission.learner_id,
            assignment_id: submission.assignment_id,
            submission: {
                submission_at: submission.submission.submission_at,
                score: adjustedScore,
            },
            percentage_score: percentageScore,
        });
    }
});  
  
return learnerData;
{
    // Example usage:
    const CourseInfo = {
        id: 451,
    name: "Math 101"
    };

    const assignmentGroup = {
        id: 12345,
        name: "Homework",
        course_id: 451,
        group_weight: 25,
        assignments: [
    {
        id: 1,
        name: "Assignment 1",
        due_at: "2023-01-25",
        points_possible: 50,
    },
    // Second assignmentGroup
    {
        id: 2,
        name: "English",
        due_at: "2023-02-27",
        points_possible: 150
      },
      // Thirth assignmentGroup
      {
        id: 3,
        name: "code the world",
        due_at:"3156-11-15",
        points_possible: 500,
      },
  };

  const learnerSubmissions = [
    learner_id: 125,
    assignment_id: 1, 2, 3,
    submission: {
        submission_at: "2024-03-09T18:30:00",
        score: 90,
    },
},

  ];

  try {
    const result = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);
    console.log(result);
  } catch (errow) {
    console.errow(errow.message);
  }