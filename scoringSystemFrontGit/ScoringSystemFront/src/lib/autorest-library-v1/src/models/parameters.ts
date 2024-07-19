import {
  OperationURLParameter,
  OperationQueryParameter,
  OperationParameter,
} from "@azure/core-client";
import {
  AddArticleRequest as AddArticleRequestMapper,
  GetArticleByIdResponse as GetArticleByIdResponseMapper,
  GetNewArticleScoreRequest as GetNewArticleScoreRequestMapper,
  AddCompanyRequest as AddCompanyRequestMapper,
  FeedbackRequest as FeedbackRequestMapper,
  AddLabelRequest as AddLabelRequestMapper,
  GetLabelByArticleIdRequest as GetLabelByArticleIdRequestMapper,
  UpdateLabelRequest as UpdateLabelRequestMapper,
  GetTopNewArticlesRequest as GetTopNewArticlesRequestMapper,
  AddNewArticleRequest as AddNewArticleRequestMapper,
  AddNewLabelRequest as AddNewLabelRequestMapper,
  GetLabelByTopicIdRequest as GetLabelByTopicIdRequestMapper,
  UpdateNewLabelRequest as UpdateNewLabelRequestMapper,
  CreateTopicRequest as CreateTopicRequestMapper,
  UpdateTopicRequest as UpdateTopicRequestMapper,
} from "../models/mappers";

export const $host: OperationURLParameter = {
  parameterPath: "$host",
  mapper: {
    serializedName: "$host",
    required: true,
    type: {
      name: "String",
    },
  },
  skipEncoding: true,
};

export const username: OperationQueryParameter = {
  parameterPath: ["options", "username"],
  mapper: {
    serializedName: "username",
    type: {
      name: "String",
    },
  },
};

export const password: OperationQueryParameter = {
  parameterPath: ["options", "password"],
  mapper: {
    serializedName: "password",
    type: {
      name: "String",
    },
  },
};

export const contentType: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String",
    },
  },
};

export const body: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: AddArticleRequestMapper,
};

export const accept: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json, text/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String",
    },
  },
};

export const body1: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: GetArticleByIdResponseMapper,
};

export const id: OperationQueryParameter = {
  parameterPath: ["options", "id"],
  mapper: {
    serializedName: "id",
    type: {
      name: "Uuid",
    },
  },
};

export const body2: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: GetNewArticleScoreRequestMapper,
};

export const body3: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: AddCompanyRequestMapper,
};

export const id1: OperationQueryParameter = {
  parameterPath: ["options", "id"],
  mapper: {
    serializedName: "id",
    type: {
      name: "String",
    },
  },
};

export const body4: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: FeedbackRequestMapper,
};

export const body5: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: AddLabelRequestMapper,
};

export const body6: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: GetLabelByArticleIdRequestMapper,
};

export const body7: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: UpdateLabelRequestMapper,
};

export const body8: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: GetTopNewArticlesRequestMapper,
};

export const body9: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: AddNewArticleRequestMapper,
};

export const body10: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: AddNewLabelRequestMapper,
};

export const body11: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: GetLabelByTopicIdRequestMapper,
};

export const body12: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: UpdateNewLabelRequestMapper,
};

export const body13: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: CreateTopicRequestMapper,
};

export const body14: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: UpdateTopicRequestMapper,
};

export const topicId: OperationQueryParameter = {
  parameterPath: ["options", "topicId"],
  mapper: {
    serializedName: "topicId",
    type: {
      name: "Uuid",
    },
  },
};
