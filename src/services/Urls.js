export const URLS = {
    // COMMAN
    LOGIN: "/api/v1/userLogin",
    LOGOUT: "/api/v1/userLogout",

    // USER 
    PROFILE_UPDATE: "/api/v1/ProfileUpdate",
    GET_PROFILE_BY_ID: "/api/v1/getUserById",
    PROFILE_UPLOAD: "/api/v1/profileUpload",
    ADD_USER_IP: "/api/v1/whitelist/user/addIpaddress",
    GET_WHITE_LIST_BY_ID: "/api/v1/whitelist/user/getwhitelistIP",
    DELETE_WHITE_LIST_IP: "/api/v1/whitelist/user/deleteWhitelist",
    GET_ALL_USER_PLAN: "/api/v1/plan/getAllUserPlan/",
    USER_GET_ALL_PLAN: "/api/v1/plan/getAllPlanUser",

    // custom PAN Verification APIs
    PAN_CARD_BASIC: "/api/v1/pan/pancard",
    PAN_CARD_BASIC: "/api/v1/pan/pancard",
    PAN_CARD_LITE: "/api/v1/pan/panLite",
    PAN_CARD_DOB: "/api/v1/pan/panDOB",
    PAN_CARD_FNAME: "/api/v1/pan/pantoFName",
    PAN_CARD_TO_AADHAR: "/api/v1/pan/pantoAadhaar",
    AADHAR_TO_PAN: "/api/v1/pan/aadhaartoPAN",
    PAN_COMPREHENSIVE: "/api/v1/pan/pancomprehensivev2",
    PAN_ADVANCE: "/api/v1/pan/panAdvance",
    PAN_AADHAR_LINK_STATUS: "/api/v1/pan/panAadhaarLinkStatus",
    //AAdhar verification Api
    AADHAR_DETAILS: "/api/v1/aadhar/aadharDetails",
    AADHAR_OTP_INITIATION: "/api/v1/aadhar/aadharOTPInitiation",
    AADHAR_VALIDATION: "/api/v1/aadhar/aadharValidation",
    // GST API's
    GST_LITE: "/api/v1/gst/gstLite",
    GST_ADVANCE: "/api/v1/gst/gstAdvance",
    PAN_TO_GST: "/api/v1/gst/pantoGst",
    GST_TO_CONTACT: "/api/v1/gst/GsttoContact",
    GST_TRN_VERIFICATION: "/api/v1/gst/gstTRNverification",
    GST_NOTICE: "/api/v1/gst/gstNotices",

    //Company verification API
    COMPANY_LIST: "/api/v1/company/companyList",
    COMPANY_DETAILS_LITE: "/api/v1/company/companyDetailsLite",
    COMPANY_DETAILS_ADVANCE: "/api/v1/company/companyDetailsAdvance",
    PAN_TO_COMPANY_DETAIL: "/api/v1/company/pantoCompanyDetails",
    COMPANY_DIN_TO_PAN: "/api/v1/company/DintoPan",
    COMPANY_PAN_TO_DIN: "/api/v1/company/PantoDIN",
    COMPANY_DIN_TO_CONTACT: "/api/v1/company/DintoContact",
    //Vehicals Verification API
    VEHICAL_DLPRIME_WITHOUT_DOB: "/api/v1/vehical/DLPrime",
    VEHICAL_DLVERIFICATION: "/api/v1/vehical/DLVerification",
    VEHICAL_DLADVANCE_WITHOUT_DOB: "/api/v1/vehical/DLAdvance",
    VEHICAL_RC_VERIFICATION: "/api/v1/vehical/RCVerification",
    VEHICAL_RC_VERIFICATION_V2: "/api/v1/vehical/RCVerificationV2",
    VEHICAL_RC_VERIFICATION_V3: "/api/v1/vehical/RCVerificationV3",
    // Bank Verification API
    BANK_ACCOUNT_LITE: "/api/v1/bank/bankAccountlite",
    BANK_ACCOUNT_PENNYDROP: "/api/v1/bank/bankAccountpennydrop",
    BANK_ACCOUNT_PENNY_LESS: "/api/v1/bank/bankAccountpennyless",
    //PassPort Verification Api
    PASSPORT_VERIFICATION: "/api/v1/passport/passportVerification",
    //Voter Id verification API
    VOTER_ID_VERIFICATION: "/api/v1/voter/voterIDAccountlite",
    //Employee Verification
    EMPLOYEE_VERIFICATION_EPFO: "/api/v1/employee/epfoAdvance",
    //Food Lisense
    FOOD_LISENSE_VERIFICATION: "/api/v1/fssai/foodLicenseVerification",
    //Import Export Verification
    IMPORT_EXPORT_VERIFICATION: "/api/v1/iec/importExportVerification",
    //MSME verification
    UDYAM_VERIFICATION: "/api/v1/msme/udyamVerification",
    PAN_TO_MSME_CHECK: "/api/v1/msme/pantoMSMSCheck",
    // TAX COMPLIANCES
    TAX_COMPLIANCES_COMPLIANCE_CHECK_206AB: "/api/v1//taxComplaince/complianceCheck206AB",
    TAX_COMPLIANCES_CHECK_ADVANCE_206AB: "/api/v1/taxComplaince/advance206AB",
    TAX_COMPLIANCES_TAN_TO_PAN: "/api/v1/taxComplaince/tantopan",
    TAX_COMPLIANCES_PAN_TO_TAN: "/api/v1/taxComplaince/pantotan",
    TAX_COMPLIANCES_PAN_IT_STATUS: "/api/v1/taxComplaince/panitStatus",
    TAX_COMPLIANCES_IT_NOTICE_DOWNLOAD: "/api/v1/taxComplaince/ItNoticeDownload",

    UDYAM_VERIFICATION: "/api/v1/msme/udyamVerification",
    PAN_TO_MSME_CHECK: "/api/v1/msme/pantoMSMSCheck",
    //Api Usage 
    USER_API_LOGS: "/api/v1/transaction/getuserAPILogs",
    USER_TRANSACTION: "/api/v1/transaction/getuserAPITransaction",
    USER_TRANSACTION_EXPORT: "/api/v1/transaction/getuserAPITransactionExport",
    //Book Demo Call
    BOOK_DEMO: "/api/v1/bookdemo",
    //user dashboard Api
    API_COUNT: "/api/v1//dashboard//getAPIcount",
    TOTAL_API_ACCESS: "/api/v1//dashboard/getAPIUsecount",
    //forget password email
    FORGET_PASSWORD_EMAIL: "/api/v1/forgotpasswordEmail",
    FORGOT_RESET_PASSWORD: "/api/v1/forgotResetPassword",
    // ADMIN 
    RESET_PASSWORD: "/api/v1/adminResetPassword",
    ADD_USER: "/api/v1/addUser",
    GET_ALL_USER: "/api/v1/getAllUser",
    UPDATE_STATUS: "/api/v1/updateStatus",
    BLOCK_UNBLOCK_IP: "/api/v1/whitelist/blockUnblockIp",
    CONTROL_ACCESS: "/api/v1/controlAccess",
    ADD_IP: "/api/v1/whitelist/addIpaddress",
    GET_ALL_WHITELIST_IP: "/api/v1/whitelist/getAllWhitelistIp",
    GET_ADMIN_API_WALLET: "/api/v1/wallet/getAdminApiWallet",
    GET_ADMIN_PRODUCT_WALLET: "/api/v1/wallet/getAdminProductWallet",
    ADD_ADMIN_WALLET: "/api/v1/wallet/addAdminWallet",
    GET_PAYMENT_HISTORY: "/api/v1/wallet/getAdminWallet",
    GET_ALL_IP_HITS: "/api/v1/whitelist/getAllIpHits",
    GET_BLOCK_IP: "/api/v1/whitelist/getblockIp",
    GET_DASHBOARD_USERS: "/api/v1/dashboard/getAlluserCount",
    GET_DASHBOARD_TRANSACTIONS: "/api/v1/dashboard/getAllTotalTranscation",
    ADD_USER_AMOUNT_WALLET: "/api/v1/wallet/addUserWallet",
    GET_CATEGORY: "/api/v1/plan/getAllCategory",
    CREATE_PLAN: "api/v1/plan/createPlan",
    GET_ALL_PLAN: "/api/v1/plan/getAllPlan",
    UPDATE_PLAN: "/api/v1/plan/updatePlan",
    API_PLAN_CHANGE: "/api/v1/plan/userChangePlanAmount",
    SEND_OTP_ON_PHONE: "/api/v1/sendOtp",
    VERIFY_OTP: "/api/v1/verifyOtp",
    MY_TRANSACTION: "/api/v1/transaction/mytransaction",
    IP_Details:"/api/v1/whitelist/getAllIpHits"

}