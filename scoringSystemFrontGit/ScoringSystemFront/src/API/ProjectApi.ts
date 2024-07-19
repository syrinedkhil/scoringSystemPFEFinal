import * as autorest from '../lib/autorest-library-v1/src'
class ProjectApi extends autorest.ScoringSystem {
  constructor() {
    super(undefined, "https://localhost:7284/");
  }

  addAuthorizationHeaders(options?: any) {
    const accessToken = localStorage.getItem("accessToken");
  
    const { requestOptions, ...rest } = options;
    
    const modifiedRequestOptions = {
      ...requestOptions,
      customHeaders: {
        ...requestOptions.customHeaders,
        Authorization: `Bearer ${accessToken}`,
      },
    };
   
    return {
      ...rest,
      requestOptions: modifiedRequestOptions,
    };
  }
}

export default ProjectApi;
