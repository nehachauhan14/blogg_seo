import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
console.log("publicRuntimeConfig", publicRuntimeConfig);
export const API = publicRuntimeConfig.PRODUCTION ? "" : 'http://localhost:8000/api'
export const APP_NAME = publicRuntimeConfig.APP_NAME;
