import { ObjectId } from "mongodb";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";
import { CourseParticipantRepository } from "@src/modules/courses/repositories/course-participant.repository.js";
import { UserRepository } from "@src/modules/users/repositories/user.repository.js";

export class ReadParticipantReportService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(user_id: any) {
    const userRepository = new UserRepository(this.db);
    const courseParticipantRepository = new CourseParticipantRepository(this.db);
    const ownedCoursesPipeline = [
      {
        '$match': {
          '_id': new ObjectId(user_id)
        }
      }, {
        '$lookup': {
          'from': 'courseParticipant', 
          'localField': '_id', 
          'foreignField': 'user_id', 
          'as': 'courses'
        }
      }, {
        '$lookup': {
          'from': 'courses', 
          'localField': 'courses.course_id', 
          'foreignField': '_id', 
          'as': 'enrolledCourses'
        }
      }, {
        '$addFields': {
          'enrolledCoursesTotal': {
            '$size': '$enrolledCourses'
          }
        }
      }, {
        '$project': {
          'enrolledCourses': 1, 
          'enrolledCoursesTotal': 1
        }
      }, {
        '$project': {
          'enrolledCourses._id': 1, 
          'enrolledCourses.title': 1, 
          'enrolledCoursesTotal': 1
        }
      }
    ];
    
    const ownedAssignmentPipeline =  [
      {
        '$match': {
          'user_id': new ObjectId(user_id)
        }
      }, {
        '$lookup': {
          'from': 'assignments', 
          'localField': 'contentDetail.content_id', 
          'foreignField': 'content_id', 
          'as': 'assignments'
        }
      }, {
        '$addFields': {
          'assignmentCount': {
            '$size': '$assignments'
          }
        }
      }, {
        '$project': {
          'assignmentCount': 1,
          '_id': 0,
        }
      }
    ];

    const iQuery: QueryInterface = {
      fields: "",
      filter: {},
      page: 1,
      pageSize: 999,
      sort: "",
    };
    const courseParticipations = await courseParticipantRepository.readMany({
      fields: "",
      filter: { user_id },
      page: 1,
      pageSize: 999,
      sort: "",
    });
    const completedCoursesData = courseParticipations.data.map(courseParticipation => {
      const contents: any = courseParticipation.contentDetail;
      const isCourseCompleted = contents.every((content: any) => content.isComplete );
      if (isCourseCompleted) return "complete";
      return "incomplete"; 
    } );
    const filteredCompletedCourses = completedCoursesData.filter( value => value === "complete" );

    const ownedCourses: any = await userRepository.aggregate(ownedCoursesPipeline, iQuery);
    const ownedAssignments: any = await courseParticipantRepository.aggregate(ownedAssignmentPipeline, iQuery);
    return {
      ...ownedCourses.data[0],
      completedCourses: filteredCompletedCourses.length,
      ...ownedAssignments.data[0]
    };
  }
}
