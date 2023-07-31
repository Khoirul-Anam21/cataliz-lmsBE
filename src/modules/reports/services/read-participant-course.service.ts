import { ApiError } from "@point-hub/express-error-handler";
import { ObjectId } from "mongodb";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";
// import { UserRepository } from "@src/modules/auth/repositories/user.repository.js";
import { CourseParticipantRepository } from "@src/modules/courses/repositories/course-participant.repository.js";
// import { AssignmentRepository } from "@src/modules/assignments/repositories/assignment.repository";

export class ReadParticipantCourseReportService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(course_id: string, user_id: any) {

    const courseParticipantRepository = new CourseParticipantRepository(this.db);
    // const assignmentRepository = new AssignmentRepository(this.db);
    // const participant = await courseParticipantRepository.read(participant_id);
    // console.log(participant);

    const courseParticipants = await courseParticipantRepository.readMany({
      fields: "",
      filter: { course_id, user_id },
      page: 1,
      pageSize: 999, 
      sort: "", 
    }); 

    // console.log(participant); 

    if (!courseParticipants) throw new ApiError(404, { msg: "course not found" });
    const iQuery: QueryInterface = {
      fields: "",
      filter: {},
      page: 1,
      pageSize: 999,
      sort: "",
    };

    const assignmentPipeline = [
      {
        '$match': {
          'user_id': new ObjectId(user_id),
          'course_id': new ObjectId(course_id)
        }
      }, {
        '$lookup': {
          'from': 'assignments',
          'localField': 'contentDetail.content_id',
          'foreignField': 'content_id',
          'as': 'assignments'
        }
      }
    ];

    const participantAssignmentCheck: any = await courseParticipantRepository.aggregate(assignmentPipeline, iQuery);

    if (participantAssignmentCheck.data[0].assignments.length === 0) {
      const noAsignmentReportDetailCoursePipeline = [
        {
          '$match': {
            'user_id': new ObjectId(user_id),
            'course_id': new ObjectId(course_id)
          }
        }, {
          '$addFields': {
            'totalContents': {
              '$size': '$contentDetail'
            },
            'completedContents': {
              '$size': {
                '$filter': {
                  'input': '$contentDetail',
                  'as': 'content',
                  'cond': {
                    '$eq': [
                      '$$content.isComplete', true
                    ]
                  }
                }
              }
            },
            'assignments': { '$literal': [] }
          }
        }, {
          '$group': {
            '_id': '$_id',
            'assignments': {
              '$first': '$assignments'
            },
            'totalContents': {
              '$first': '$totalContents'
            },
            'completedContents': {
              '$first': '$completedContents'
            }
          }
        },
      ];
      const result: any = await courseParticipantRepository.aggregate(noAsignmentReportDetailCoursePipeline, iQuery);
      return result.data[0];
    }


    const detailCourseReportPipeline = [
      {
        '$match': {
          'user_id': new ObjectId(user_id),
          'course_id': new ObjectId(course_id)
        }
      }, {
        '$lookup': {
          'from': 'assignments',
          'localField': 'contentDetail.content_id',
          'foreignField': 'content_id',
          'as': 'assignments'
        }
      }, {
        '$unwind': {
          'path': '$assignments',
          'preserveNullAndEmptyArrays': false
        }
      }, {
        '$addFields': {
          'totalContents': {
            '$size': '$contentDetail'
          },
          'completedContents': {
            '$size': {
              '$filter': {
                'input': '$contentDetail',
                'as': 'content',
                'cond': {
                  '$eq': [
                    '$$content.isComplete', true
                  ]
                }
              }
            }
          }
        }
      }, {
        '$lookup': {
          'from': 'assignmentSubmissions',
          'localField': 'assignments._id',
          'foreignField': 'assignment_id',
          'as': 'submissions'
        }
      }, {
        '$addFields': {
          'assignments.submitted': {
            '$gt': [
              {
                '$size': '$submissions'
              }, 0
            ]
          }
        }
      }, {
        '$group': {
          '_id': '$_id',
          'assignments': {
            '$push': '$assignments'
          },
          'totalContents': {
            '$first': '$totalContents'
          },
          'completedContents': {
            '$first': '$completedContents'
          }
        }
      }
    ];


    const result: any = await courseParticipantRepository.aggregate(detailCourseReportPipeline, iQuery);
    // if (result.data.length === 0) throw new ApiError(404, { msg: "course not found" });
    return result.data[0];
  }
}
