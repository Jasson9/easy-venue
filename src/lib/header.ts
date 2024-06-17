export function get_session_token(AuthHeader:string){
    return AuthHeader.split(' ')[1];
}