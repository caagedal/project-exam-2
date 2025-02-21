export default function sanitizeMail(email){
    
    let sanitized = email.trim();
    sanitized = sanitized.replace(/[^a-zA-Z0-9@.!#$%&'*+/=?^_`{|}~-]/g, "");

    return sanitized;
}

