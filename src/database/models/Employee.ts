import { Model } from '@nozbe/watermelondb';
import { field, date, readonly } from '@nozbe/watermelondb/decorators';

export class Employee extends Model {
  static table = 'employees';

  @field('first_name') firstName!: string;
  @field('last_name') lastName!: string;
  @field('email') email!: string;
  @field('department') department!: string;
  @field('role') role!: string;
  @field('status') status!: 'active' | 'inactive' | 'on_leave';

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}