import { Injectable } from '@nestjs/common';
import { data } from '../applications.data';

// define interfaces
export interface Application {
    id: string,
    jobTitle: string,
    companyName: string,
    status: string,
    dateApplied: string
}

export interface Statistics {
    total_applications: number;
    status_count: {
        pending: number;
        accepted: number;
        rejected: number;
    };
    month_count: {
        [month: string]: number;
    };
}

const months = ['January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]


@Injectable()
export class ApplicationsService {
    /**
 * Fetches all job applications
 * @returns array of all job applications
 */
    getAllApplications(): Application[] {
        const allJobs = data;
        return allJobs;
    }


    /**
     * Gets the statistics of all job application
     * @returns An object representation of the stats
     */
    getAppStats(): Statistics {
        //gets the number of application in the data
        const totalApplications: number = data.length;
        // gets the statuses and corresponding number of times
        const statusCounts: Statistics["status_count"] = data.reduce((acc, val) => {
            acc[val.status] = (acc[val.status] || 0) + 1;
            return acc;
        }, {} as Statistics["status_count"])

        // gets the count by month of application
        const monthlyCount = data.reduce((acc, val) => {
            const month = new Date(val.dateApplied).getMonth() + 1;
            const year = new Date(val.dateApplied).getFullYear();
            const key = `${year}-${month}`;
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});


        const stat = {
            total_applications: totalApplications,
            status_count: statusCounts,
            month_count: monthlyCount
        }
        return stat;
    }
}
