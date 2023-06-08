import axios from 'axios'
import {google} from 'googleapis'

 function getoauth2Client (client_id, client_secret) {
    const oauth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      'https://blog-fe0k.onrender.com/rest/v1/calendar/redirect/'
    )
   
    return oauth2Client
  }
   export async function getAuthorizationUrl (client_id, client_secret) {
    const scopes = [
      'https://www.googleapis.com/auth/calendar.events.readonly',
      'https://www.googleapis.com/auth/calendar.readonly',
      'https://www.googleapis.com/auth/calendar'
    ]
    const oauth2Client = getoauth2Client(client_id, client_secret)
    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      include_granted_scopes: true
    })
    return authorizationUrl
  }
  export async function getGsuiteToken (code, client_id, client_secret) {
    const oauth2Client = getoauth2Client(client_id, client_secret)
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)
    return tokens.access_token
  }
  export async function getCalender(access_token){
    const resp = await axios.get(`https://www.googleapis.com/calendar/v3/users/me/calendarList`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json'
    }
  }).catch(err=>{console.log(err.data.error.messages)})
  console.log(resp.data);
  return resp.data;
  }
  export async function getEvents(access_token,CalenderId){
    const resp = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/${CalenderId}/events`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json'
    }
  }).catch(err=>{console.log(err.data.error.messages)})
  console.log(resp.data);
  return resp.data;
  }
