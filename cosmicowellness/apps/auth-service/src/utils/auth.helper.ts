import crypto from 'crypto';
import { ValidationError } from '../../../../packages/error-handler';
import redis from '../../../../packages/libs/redis';
import { send } from 'process';
import { sendEmail } from '../sendMail';
import { NextFunction } from 'express';


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegistrationData = (data: any, userType: "user" | "seller") => {
    const { name, email, password, phone_number, country } = data;

    if (!name || !email || !password || (userType === "seller" && (!phone_number || !country))) {
        throw new ValidationError('Missing required fields for registration');
    }
    if (!emailRegex.test(email)) {
        throw new ValidationError('Invalid email format');
    }

    return true;
}

export const checkOtpRestrictions = async (email: string, next: NextFunction) => {
    if (await redis.get(`otp_lock:${email}`)) {
        return next(new ValidationError("Account locked due to multiple failed OTP attepmts. Please try again after later 30 mins"));
    }
    if (await redis.get(`otp_spam_lock:${email}`)) {
        return next(new ValidationError("Too many OTP requests. Please try again after 1 hour before requesting ")
        )
    }
    if(await redis.get(`otp_cooldown:${email}`)){
        return next(new ValidationError("Please wait for 1 minute before requesting a new OTP"));
    }

};

export const trackOtpRequests= async(email:string,next:NextFunction)=>{
    const otpRequestKey= `otp_request_count:${email}`;
    let otpRequests = parseInt((await redis.get(otpRequestKey)) || "0");
    if(otpRequests >= 2){
        await redis.set(`otp_spam_lock:${email}`,"locked","EX",3600);//lock for 1 hour
        return next(new ValidationError ("Too many OTP requests. Please try again after 1 hour before requesting again"));
    }
    await redis.set(otpRequestKey,otpRequests+1,"EX",60*60); //expire in 1 hour
}
export const sendOtp = async (name: string, email: string, template: string) => {
    const otp = crypto.randomInt(1000, 9999).toString();
    await sendEmail(email, "Verify your email", template, { name, otp });
    await redis.set(`otp:${email}`, otp, 'EX', 5 * 60);
    await redis.set(`otp_cooldown:${email}`, 'true', 'EX', 60);

}






