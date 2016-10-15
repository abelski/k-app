"use strict";
var UrlUtil = (function () {
    function UrlUtil() {
    }
    UrlUtil.HOST_NAME = 'http://localhost:9000'; // need to user real address of server
    /**
     * Registration url's
     */
    UrlUtil.REGISTER_ACCOUNT = UrlUtil.HOST_NAME + '/register';
    /**
     * Vacations url's
     */
    UrlUtil.GET_ALL_VACATIONS = UrlUtil.HOST_NAME + '/vacations';
    UrlUtil.GET_VACATION = UrlUtil.HOST_NAME + '/vacations/';
    UrlUtil.ADD_MEMBER = UrlUtil.HOST_NAME + '/vacations/';
    UrlUtil.ADD_VACATION = UrlUtil.HOST_NAME + '/vacation';
    UrlUtil.GET_ACTIVE_VACATION = UrlUtil.HOST_NAME + "/user/";
    UrlUtil.GET_PAST_VACATION = UrlUtil.HOST_NAME + "/user/";
    UrlUtil.GET_OWNED_VACATION = UrlUtil.HOST_NAME + "/user/";
    /**
     * Comments url's
     */
    UrlUtil.ADD_COMMENT = UrlUtil.HOST_NAME + '/comment';
    /**
     * Filters url's
     */
    UrlUtil.FILTER = UrlUtil.HOST_NAME + '/filtered-vacations';
    /**
     * Users url's
     */
    UrlUtil.GET_ALL_USERS = UrlUtil.HOST_NAME + '/users';
    UrlUtil.GET_USER_BY_ID = UrlUtil.HOST_NAME + '/users/';
    return UrlUtil;
}());
exports.UrlUtil = UrlUtil;
//# sourceMappingURL=url.util.js.map