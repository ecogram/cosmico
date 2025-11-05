export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly details?: any;
    constructor(message: string, statusCode = 500, isOperational = true, details?: any) {
        super(message);

        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;
        Error.captureStackTrace(this);


    }
}

//Not found error 
export class NotFoundError extends AppError {
    constructor(message = 'Resource Not Found', details?: any) {
        super(message, 404, true, details);
    }
}

//validation error(USE FOR JOII/ZOD /REACT-HOOK-FORM VALIDATIONS,)
export class ValidationError extends AppError {
    constructor(message = 'Validation Error', details?: any) {
        super(message, 400, true, details);
    }
}
//aUTHENTICATION ERRORt
export class AuthError extends AppError {
    constructor(message = "Unauthorise") {
        super(message, 401);


    }
}
//FORBIDDEN ERROR
export class ForbiddenError extends AppError {
    constructor(message = "Forbidden Access") {
        super(message, 403);


    }
}
//FORBIDDEN ERROR
export class DatabaseError extends AppError {
    constructor(message = "Database Error", details?: any) {
        super(message, 500, true, details);


    }
}

export class rateLimitError extends AppError {
    constructor(message = "Rate Limit Exceeded", details?: any) {
        super(message, 429, true, details);


    }
}