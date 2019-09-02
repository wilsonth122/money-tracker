import Cookies from "universal-cookie";

const cookies = new Cookies();

export function tokenHeader() {
    let token = cookies.get('token')

    return { headers: {Authorization: `Bearer ${token}`} }
}

export function storeUserDetails(data: any) {
    cookies.remove('user')
    cookies.remove('token')

    cookies.set('user', data.email, { sameSite: "strict" })
    cookies.set('token', data.token, { sameSite: "strict" })
  }
  
export function deleteUserDetails() {
    cookies.remove('user')
    cookies.remove('token')
}