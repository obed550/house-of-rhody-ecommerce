# 🔐 House of Rhody Admin Portal - Access Control

## ⚠️ RESTRICTED ACCESS

Admin portal access is **restricted** to authorized personnel only.

### Authorized Admin
**Name:** Rhoda
**Phone:** 0599861653  
**Password:** RHODA@

---

## 🛡️ Security Features

✅ **Single Admin Account** - Only one authorized administrator  
✅ **Restricted Access** - Attempt to login as another admin account will be rejected  
✅ **Hidden Audit Logs** - Admin login attempts are NOT logged to maintain privacy  
✅ **Encrypted Passwords** - All passwords hashed with bcrypt  
✅ **Session Tokens** - JWT-based authentication  
✅ **Protected Routes** - Admin dashboard requires authentication  

---

## 🔑 Access Rules

1. **Only Rhoda can access admin panel**
   - Attempting to create another admin account will be rejected
   - Attempting to login with admin role but different credentials will fail

2. **Admin logins are hidden**
   - Admin access attempts are NOT recorded in audit logs
   - This protects admin privacy and security
   - Only customer logins are logged for compliance

3. **Session expires after 7 days**
   - Automatic logout for security
   - Requires re-authentication

---

## 📋 What's in Audit Logs?

✅ Customer account logins  
✅ Product management actions  
✅ Order status changes  
✅ Payment transactions  

❌ Admin account logins (HIDDEN)  
❌ Admin password changes (HIDDEN)  
❌ Admin activity tracking (HIDDEN)  

---

## 🚀 How to Deploy

1. Update database seed with these credentials
2. Deploy to production
3. Remove this file from public access
4. Keep credentials secure

---

## ⚡ Important Notes

- **DO NOT** share these credentials publicly
- **DO NOT** create additional admin accounts
- **DO NOT** modify the restricted access code
- **CHANGE** the password after first login (optional, but recommended)
- **BACKUP** authentication tokens securely

---

*Last Updated: 2026-10-06*  
*Security Level: Restricted*
