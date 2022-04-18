const loginPerfect = {
  email: 'email@email.com',
  password: "super_secreto"
}

export const loginEmailFail = {
  email: 'email_errado',
  password: "super_secreto"
}

export const loginPasswordFail = {
  email: 'email@email.com',
  password: "fail"
}

export const loginPasswordVazio = {
  email: 'email@email.com',
  password: ''
}

export const tokenInvalid = 'eyJhbGciOiJIUzI1NiIsIn5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjUwMjkyNTQ3LCJleHAiOjE2NTAzNTAxNDd9.0uGu7Xb216zZh0EPew2Hj14SKUQ6iPl2PFX-YjafiLY'

export default loginPerfect;