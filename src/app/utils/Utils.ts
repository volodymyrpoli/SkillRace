export class Utils {

  static parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }

  static isCurrentUserAdmin() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const roles = currentUser.detail.role as { authority: string }[];
    console.dir(roles);
    return roles.some(role => {
      if (role.authority === 'ROLE_ADMIN') {
        return true;
      }
    });
  }
}
