import { User } from '../../model/user';

const USER = 'user';

export function getUserInfo(): User {
    try {
        return JSON.parse( localStorage.getItem( USER ) ) as User;
    } catch ( err ) {
        console.error( err );
    }
    return null;
}

export function getNickName(): string {
    try {
        const user = JSON.parse( localStorage.getItem( USER ) );
        return user.nickName;
    } catch ( e ) {
        console.error( e );
    }
    return null;
}
