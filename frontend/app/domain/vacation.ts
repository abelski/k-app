import { User } from './user';
import { Image } from './image';
import { Tag } from './tag';
import { Activity } from './activity';
import { Comment } from './comment';
import { VacationStatus } from './enums/vacation-status';

export class Vacation {
    constructor(
    public owner: User,
    public members: User[],
    public title: String,
    public description: String ,
    public beginDate: Date,
    public endDate: Date,
    public tags: Tag[],
    public estimatedCost: number,
    public minMembers: number,
    public status: VacationStatus,
    public plannedActivities: Activity[],
    public comments: Comment[],
    public gallery: Image[],
    public titleImg: string, //change to Image,
    public days: number,
    public transoprt: string,
    public departureCountry: string,
    public targetCountry: string,
    public targetCity: string,
    public id?: any
    ) {
        
    }
}