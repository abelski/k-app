export class UrlUtil {

    private static HOST_NAME: string = 'http://localhost:9000'; // need to user real address of server

    /**
     * Registration url's
     */
    public static REGISTER_ACCOUNT: string = UrlUtil.HOST_NAME + '/register';

    /**
     * Vacations url's
     */
    public static GET_ALL_VACATIONS: string = UrlUtil.HOST_NAME + '/vacations';
    public static GET_VACATION: string = UrlUtil.HOST_NAME + '/vacations/';
    public static ADD_MEMBER: string = UrlUtil.HOST_NAME + '/vacations/'
    public static ADD_VACATION: string =  UrlUtil.HOST_NAME + '/vacation';

    /**
     * Comments url's
     */
    public static ADD_COMMENT: string = UrlUtil.HOST_NAME + '/comment';

    /**
     * Filters url's
     */
    public static FILTER = UrlUtil.HOST_NAME + '/filtered-vacations';

    /**
     * Users url's
     */
    public static GET_ALL_USERS = UrlUtil.HOST_NAME + '/users';
    public static GET_USER_BY_ID = UrlUtil.HOST_NAME + '/users/';
}