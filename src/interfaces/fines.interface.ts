interface IFinesRes {
    plate: string;
    class: string;
    number: number;
    reindeer: number;
    fines: {
        coupunNumber: number;
        employee: string;
        employeeNumber: number;
        route: string;
        date: string;
        description: string;
        situation: string;
        gravity: string;
        local: string;
        country: string;
        value: number;
        paid: boolean;
    }[];
}
