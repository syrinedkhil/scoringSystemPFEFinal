import * as coreClient from "@azure/core-client";
import * as coreRestPipeline from "@azure/core-rest-pipeline";
import * as coreAuth from "@azure/core-auth";
import * as Parameters from "./models/parameters";
import * as Mappers from "./models/mappers";
import {
  ScoringSystemOptionalParams,
  SignInOptionalParams,
  AddArticleOptionalParams,
  AddArticleResponse,
  GetArticleByIdOptionalParams,
  GetArticleByIdOperationResponse,
  GetAllArticlesOptionalParams,
  GetAllArticlesResponse,
  DeleteArticleByIdOptionalParams,
  ScoreArticlesOptionalParams,
  ScoreArticlesResponse,
  AddCompaniesOptionalParams,
  AddCompaniesResponse,
  GetAllCompaniesOptionalParams,
  GetAllCompaniesResponse,
  DeleteCompanyOptionalParams,
  AddFeedbackOptionalParams,
  GetFeedbackByIdOptionalParams,
  GetFeedbackByIdResponse,
  GetAllFeedbackOptionalParams,
  GetAllFeedbackResponse,
  GetAllFeedbackByCompanyNameOptionalParams,
  GetAllFeedbackByCompanyNameResponse,
  DeleteFeedbackOptionalParams,
  AddLabelOptionalParams,
  AddLabelResponse,
  GetLabelbyIdOptionalParams,
  GetLabelbyIdResponse,
  GetLabelsByArticlesOptionalParams,
  GetLabelsByArticlesResponse,
  EditLabelOptionalParams,
  EditLabelResponse,
  GetTopArticlesOptionalParams,
  GetTopArticlesResponse,
  AddNewArticleOptionalParams,
  AddNewArticleOperationResponse,
  DeleteNewArticleOptionalParams,
  AddNewLabelOptionalParams,
  AddNewLabelResponse,
  GetNewLabelByIdOptionalParams,
  GetNewLabelByIdResponse,
  EditNewLabelOptionalParams,
  EditNewLabelResponse,
  AddTopicOptionalParams,
  AddTopicResponse,
  UpdateTopicOptionalParams,
  GetAllTopicsOptionalParams,
  GetAllTopicsResponse,
  GetTopicByIdOptionalParams,
  GetTopicByIdResponse,
  DeleteTopicOptionalParams,
} from "./models";

export class ScoringSystem extends coreClient.ServiceClient {
  $host: string;

  /**
   * Initializes a new instance of the ScoringSystem class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param $host server parameter
   * @param options The parameter options
   */
  constructor(
    credentials: coreAuth.TokenCredential|undefined,
    $host: string,
    options?: ScoringSystemOptionalParams,
  ) {
    
    if ($host === undefined) {
      throw new Error("'$host' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: ScoringSystemOptionalParams = {
      requestContentType: "application/json; charset=utf-8",
      credential: credentials,
    };

    const packageDetails = `azsdk-js-scoringSystem/1.0.0-beta.1`;
    const userAgentPrefix =
      options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;

    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix,
      },
      endpoint: options.endpoint ?? options.baseUri ?? "{$host}",
    };
    super(optionsWithDefaults);

    let bearerTokenAuthenticationPolicyFound: boolean = false;
    if (options?.pipeline && options.pipeline.getOrderedPolicies().length > 0) {
      const pipelinePolicies: coreRestPipeline.PipelinePolicy[] =
        options.pipeline.getOrderedPolicies();
      bearerTokenAuthenticationPolicyFound = pipelinePolicies.some(
        (pipelinePolicy) =>
          pipelinePolicy.name ===
          coreRestPipeline.bearerTokenAuthenticationPolicyName,
      );
    }
    if (
      !options ||
      !options.pipeline ||
      options.pipeline.getOrderedPolicies().length == 0 ||
      !bearerTokenAuthenticationPolicyFound
    ) {
      this.pipeline.removePolicy({
        name: coreRestPipeline.bearerTokenAuthenticationPolicyName,
      });
      this.pipeline.addPolicy(
        coreRestPipeline.bearerTokenAuthenticationPolicy({
          credential: credentials,
          scopes:
            optionsWithDefaults.credentialScopes ??
            `${optionsWithDefaults.endpoint}/.default`,
          challengeCallbacks: {
            authorizeRequestOnChallenge:
              coreClient.authorizeRequestOnClaimChallenge,
          },
        }),
      );
    }
    // Parameter assignments
    this.$host = $host;
  }

  /** @param options The options parameters. */
  signIn(options?: SignInOptionalParams): Promise<void> {
    return this.sendOperationRequest({ options }, signInOperationSpec);
  }

  /** @param options The options parameters. */
  addArticle(options?: AddArticleOptionalParams): Promise<AddArticleResponse> {
    return this.sendOperationRequest({ options }, addArticleOperationSpec);
  }

  /** @param options The options parameters. */
  getArticleById(
    options?: GetArticleByIdOptionalParams,
  ): Promise<GetArticleByIdOperationResponse> {
    return this.sendOperationRequest({ options }, getArticleByIdOperationSpec);
  }

  /** @param options The options parameters. */
  getAllArticles(
    options?: GetAllArticlesOptionalParams,
  ): Promise<GetAllArticlesResponse> {
    return this.sendOperationRequest({ options }, getAllArticlesOperationSpec);
  }

  /** @param options The options parameters. */
  deleteArticleById(options?: DeleteArticleByIdOptionalParams): Promise<void> {
    return this.sendOperationRequest(
      { options },
      deleteArticleByIdOperationSpec,
    );
  }

  /** @param options The options parameters. */
  scoreArticles(
    options?: ScoreArticlesOptionalParams,
  ): Promise<ScoreArticlesResponse> {
    return this.sendOperationRequest({ options }, scoreArticlesOperationSpec);
  }

  /** @param options The options parameters. */
  addCompanies(
    options?: AddCompaniesOptionalParams,
  ): Promise<AddCompaniesResponse> {
    return this.sendOperationRequest({ options }, addCompaniesOperationSpec);
  }

  /** @param options The options parameters. */
  getAllCompanies(
    options?: GetAllCompaniesOptionalParams,
  ): Promise<GetAllCompaniesResponse> {
    return this.sendOperationRequest({ options }, getAllCompaniesOperationSpec);
  }

  /** @param options The options parameters. */
  deleteCompany(options?: DeleteCompanyOptionalParams): Promise<void> {
    return this.sendOperationRequest({ options }, deleteCompanyOperationSpec);
  }

  /** @param options The options parameters. */
  addFeedback(options?: AddFeedbackOptionalParams): Promise<void> {
    return this.sendOperationRequest({ options }, addFeedbackOperationSpec);
  }

  /** @param options The options parameters. */
  getFeedbackById(
    options?: GetFeedbackByIdOptionalParams,
  ): Promise<GetFeedbackByIdResponse> {
    return this.sendOperationRequest({ options }, getFeedbackByIdOperationSpec);
  }

  /** @param options The options parameters. */
  getAllFeedback(
    options?: GetAllFeedbackOptionalParams,
  ): Promise<GetAllFeedbackResponse> {
    return this.sendOperationRequest({ options }, getAllFeedbackOperationSpec);
  }

  /** @param options The options parameters. */
  getAllFeedbackByCompanyName(
    options?: GetAllFeedbackByCompanyNameOptionalParams,
  ): Promise<GetAllFeedbackByCompanyNameResponse> {
    return this.sendOperationRequest(
      { options },
      getAllFeedbackByCompanyNameOperationSpec,
    );
  }

  /** @param options The options parameters. */
  deleteFeedback(options?: DeleteFeedbackOptionalParams): Promise<void> {
    return this.sendOperationRequest({ options }, deleteFeedbackOperationSpec);
  }

  /** @param options The options parameters. */
  addLabel(options?: AddLabelOptionalParams): Promise<AddLabelResponse> {
    return this.sendOperationRequest({ options }, addLabelOperationSpec);
  }

  /** @param options The options parameters. */
  getLabelbyId(
    options?: GetLabelbyIdOptionalParams,
  ): Promise<GetLabelbyIdResponse> {
    return this.sendOperationRequest({ options }, getLabelbyIdOperationSpec);
  }

  /** @param options The options parameters. */
  getLabelsByArticles(
    options?: GetLabelsByArticlesOptionalParams,
  ): Promise<GetLabelsByArticlesResponse> {
    return this.sendOperationRequest(
      { options },
      getLabelsByArticlesOperationSpec,
    );
  }

  /** @param options The options parameters. */
  editLabel(options?: EditLabelOptionalParams): Promise<EditLabelResponse> {
    return this.sendOperationRequest({ options }, editLabelOperationSpec);
  }

  /** @param options The options parameters. */
  getTopArticles(
    options?: GetTopArticlesOptionalParams,
  ): Promise<GetTopArticlesResponse> {
    return this.sendOperationRequest({ options }, getTopArticlesOperationSpec);
  }

  /** @param options The options parameters. */
  addNewArticle(
    options?: AddNewArticleOptionalParams,
  ): Promise<AddNewArticleOperationResponse> {
    return this.sendOperationRequest({ options }, addNewArticleOperationSpec);
  }

  /** @param options The options parameters. */
  deleteNewArticle(options?: DeleteNewArticleOptionalParams): Promise<void> {
    return this.sendOperationRequest(
      { options },
      deleteNewArticleOperationSpec,
    );
  }

  /** @param options The options parameters. */
  addNewLabel(
    options?: AddNewLabelOptionalParams,
  ): Promise<AddNewLabelResponse> {
    return this.sendOperationRequest({ options }, addNewLabelOperationSpec);
  }

  /** @param options The options parameters. */
  getNewLabelById(
    options?: GetNewLabelByIdOptionalParams,
  ): Promise<GetNewLabelByIdResponse> {
    return this.sendOperationRequest({ options }, getNewLabelByIdOperationSpec);
  }

  /** @param options The options parameters. */
  editNewLabel(
    options?: EditNewLabelOptionalParams,
  ): Promise<EditNewLabelResponse> {
    return this.sendOperationRequest({ options }, editNewLabelOperationSpec);
  }

  /** @param options The options parameters. */
  addTopic(options?: AddTopicOptionalParams): Promise<AddTopicResponse> {
    return this.sendOperationRequest({ options }, addTopicOperationSpec);
  }

  /** @param options The options parameters. */
  updateTopic(options?: UpdateTopicOptionalParams): Promise<void> {
    return this.sendOperationRequest({ options }, updateTopicOperationSpec);
  }

  /** @param options The options parameters. */
  getAllTopics(
    options?: GetAllTopicsOptionalParams,
  ): Promise<GetAllTopicsResponse> {
    return this.sendOperationRequest({ options }, getAllTopicsOperationSpec);
  }

  /** @param options The options parameters. */
  getTopicById(
    options?: GetTopicByIdOptionalParams,
  ): Promise<GetTopicByIdResponse> {
    return this.sendOperationRequest({ options }, getTopicByIdOperationSpec);
  }

  /** @param options The options parameters. */
  deleteTopic(options?: DeleteTopicOptionalParams): Promise<void> {
    return this.sendOperationRequest({ options }, deleteTopicOperationSpec);
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const signInOperationSpec: coreClient.OperationSpec = {
  path: "/api/Account/SignIn",
  httpMethod: "GET",
  responses: { 200: {} },
  queryParameters: [Parameters.username, Parameters.password],
  urlParameters: [Parameters.$host],
  serializer,
};
const addArticleOperationSpec: coreClient.OperationSpec = {
  path: "/api/Article/Add",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ArticleResponse,
    },
  },
  requestBody: Parameters.body,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const getArticleByIdOperationSpec: coreClient.OperationSpec = {
  path: "/api/Article/GetById",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ArticleResponse,
    },
  },
  requestBody: Parameters.body1,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const getAllArticlesOperationSpec: coreClient.OperationSpec = {
  path: "/api/Article/GetAll",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "ArticleResponse" },
          },
        },
      },
    },
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
};
const deleteArticleByIdOperationSpec: coreClient.OperationSpec = {
  path: "/api/Article/Delete",
  httpMethod: "DELETE",
  responses: { 200: {} },
  queryParameters: [Parameters.id],
  urlParameters: [Parameters.$host],
  serializer,
};
const scoreArticlesOperationSpec: coreClient.OperationSpec = {
  path: "/api/ArticleScore/ScoreArticles",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "NewArticleScoreResponse" },
          },
        },
      },
    },
  },
  requestBody: Parameters.body2,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const addCompaniesOperationSpec: coreClient.OperationSpec = {
  path: "/api/Company/Add",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.CompanyResponse,
    },
  },
  requestBody: Parameters.body3,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const getAllCompaniesOperationSpec: coreClient.OperationSpec = {
  path: "/api/Company/GetAll",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "CompanyResponse" },
          },
        },
      },
    },
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
};
const deleteCompanyOperationSpec: coreClient.OperationSpec = {
  path: "/api/Company/DeleteCompany",
  httpMethod: "DELETE",
  responses: { 200: {} },
  queryParameters: [Parameters.id1],
  urlParameters: [Parameters.$host],
  serializer,
};
const addFeedbackOperationSpec: coreClient.OperationSpec = {
  path: "/api/Feedback/Add",
  httpMethod: "POST",
  responses: { 200: {} },
  requestBody: Parameters.body4,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer,
};
const getFeedbackByIdOperationSpec: coreClient.OperationSpec = {
  path: "/api/Feedback/GetById",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.FeedbackResponse,
    },
  },
  queryParameters: [Parameters.id1],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
};
const getAllFeedbackOperationSpec: coreClient.OperationSpec = {
  path: "/api/Feedback/GetAll",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "FeedbackResponse" },
          },
        },
      },
    },
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
};
const getAllFeedbackByCompanyNameOperationSpec: coreClient.OperationSpec = {
  path: "/api/Feedback/GetAllFeedbackByCompanyName",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "NewArticleResponse" },
          },
        },
      },
    },
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
};
const deleteFeedbackOperationSpec: coreClient.OperationSpec = {
  path: "/api/Feedback/Delete",
  httpMethod: "DELETE",
  responses: { 200: {} },
  queryParameters: [Parameters.id1],
  urlParameters: [Parameters.$host],
  serializer,
};
const addLabelOperationSpec: coreClient.OperationSpec = {
  path: "/api/Label/Add",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.LabelResponse,
    },
  },
  requestBody: Parameters.body5,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const getLabelbyIdOperationSpec: coreClient.OperationSpec = {
  path: "/api/Label/GetbyId",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "LabelResponse" } },
        },
      },
    },
  },
  requestBody: Parameters.body6,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const getLabelsByArticlesOperationSpec: coreClient.OperationSpec = {
  path: "/api/Label/GetLabelsByArticles",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Sequence",
              element: {
                type: { name: "Composite", className: "LabelResponse" },
              },
            },
          },
        },
      },
    },
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
};
const editLabelOperationSpec: coreClient.OperationSpec = {
  path: "/api/Label/Edit",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.LabelResponse,
    },
  },
  requestBody: Parameters.body7,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const getTopArticlesOperationSpec: coreClient.OperationSpec = {
  path: "/api/Articles/GetTopArticles",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "NewArticleResponse" },
          },
        },
      },
    },
  },
  requestBody: Parameters.body8,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const addNewArticleOperationSpec: coreClient.OperationSpec = {
  path: "/api/Articles/AddNewArticle",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AddNewArticleResponse,
    },
  },
  requestBody: Parameters.body9,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const deleteNewArticleOperationSpec: coreClient.OperationSpec = {
  path: "/api/Articles/DeleteNewArticle",
  httpMethod: "DELETE",
  responses: { 200: {} },
  queryParameters: [Parameters.id1],
  urlParameters: [Parameters.$host],
  serializer,
};
const addNewLabelOperationSpec: coreClient.OperationSpec = {
  path: "/api/NewLabel/Add",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.NewLabelResponse,
    },
  },
  requestBody: Parameters.body10,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const getNewLabelByIdOperationSpec: coreClient.OperationSpec = {
  path: "/api/NewLabel/GetbyId",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "NewLabelResponse" },
          },
        },
      },
    },
  },
  requestBody: Parameters.body11,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const editNewLabelOperationSpec: coreClient.OperationSpec = {
  path: "/api/NewLabel/Edit",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.NewLabelResponse,
    },
  },
  requestBody: Parameters.body12,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const addTopicOperationSpec: coreClient.OperationSpec = {
  path: "/api/Topic/Add",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.TopicResponse,
    },
  },
  requestBody: Parameters.body13,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const updateTopicOperationSpec: coreClient.OperationSpec = {
  path: "/api/Topic/Update",
  httpMethod: "POST",
  responses: { 200: {} },
  requestBody: Parameters.body14,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer,
};
const getAllTopicsOperationSpec: coreClient.OperationSpec = {
  path: "/api/Topic/All",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "TopicResponse" } },
        },
      },
    },
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
};
const getTopicByIdOperationSpec: coreClient.OperationSpec = {
  path: "/api/Topic/GetTopicById",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TopicResponse,
    },
  },
  queryParameters: [Parameters.topicId],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
};
const deleteTopicOperationSpec: coreClient.OperationSpec = {
  path: "/api/Topic/Delete",
  httpMethod: "DELETE",
  responses: { 200: {} },
  queryParameters: [Parameters.id],
  urlParameters: [Parameters.$host],
  serializer,
};
