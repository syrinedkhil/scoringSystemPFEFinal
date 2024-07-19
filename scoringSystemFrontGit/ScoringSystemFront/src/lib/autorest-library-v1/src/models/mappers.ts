import * as coreClient from "@azure/core-client";

export const AddArticleRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "AddArticleRequest",
    modelProperties: {
      articleTexte: {
        serializedName: "articleTexte",
        nullable: true,
        type: {
          name: "String",
        },
      },
      labels: {
        serializedName: "labels",
        nullable: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "LabelResponse",
            },
          },
        },
      },
    },
  },
};

export const LabelResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LabelResponse",
    modelProperties: {
      labelId: {
        serializedName: "labelId",
        type: {
          name: "Uuid",
        },
      },
      item: {
        serializedName: "item",
        nullable: true,
        type: {
          name: "String",
        },
      },
      score: {
        serializedName: "score",
        type: {
          name: "Number",
        },
      },
      priority: {
        serializedName: "priority",
        type: {
          name: "Number",
        },
      },
      articleId: {
        serializedName: "articleId",
        type: {
          name: "Uuid",
        },
      },
    },
  },
};

export const ArticleResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ArticleResponse",
    modelProperties: {
      articleId: {
        serializedName: "articleId",
        required: true,
        type: {
          name: "Uuid",
        },
      },
      articleTexte: {
        constraints: {
          MinLength: 1,
        },
        serializedName: "articleTexte",
        required: true,
        type: {
          name: "String",
        },
      },
      labels: {
        serializedName: "labels",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "LabelResponse",
            },
          },
        },
      },
      finalScore: {
        serializedName: "finalScore",
        required: true,
        type: {
          name: "Number",
        },
      },
    },
  },
};

export const GetArticleByIdResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "GetArticleByIdResponse",
    modelProperties: {
      articleId: {
        serializedName: "articleId",
        type: {
          name: "Uuid",
        },
      },
    },
  },
};

export const GetNewArticleScoreRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "GetNewArticleScoreRequest",
    modelProperties: {
      topicId: {
        serializedName: "topicId",
        type: {
          name: "Uuid",
        },
      },
    },
  },
};

export const NewArticleScoreResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "NewArticleScoreResponse",
    modelProperties: {
      topicId: {
        serializedName: "topicId",
        required: true,
        type: {
          name: "Uuid",
        },
      },
      source: {
        constraints: {
          MinLength: 1,
        },
        serializedName: "source",
        required: true,
        type: {
          name: "String",
        },
      },
      author: {
        constraints: {
          MinLength: 1,
        },
        serializedName: "author",
        required: true,
        type: {
          name: "String",
        },
      },
      url: {
        constraints: {
          MinLength: 1,
        },
        serializedName: "url",
        required: true,
        type: {
          name: "String",
        },
      },
      title: {
        constraints: {
          MinLength: 1,
        },
        serializedName: "title",
        required: true,
        type: {
          name: "String",
        },
      },
      description: {
        constraints: {
          MinLength: 1,
        },
        serializedName: "description",
        required: true,
        type: {
          name: "String",
        },
      },
      content: {
        constraints: {
          MinLength: 1,
        },
        serializedName: "content",
        required: true,
        type: {
          name: "String",
        },
      },
      companiesIds: {
        serializedName: "companies_Ids",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Uuid",
            },
          },
        },
      },
      companiesScores: {
        serializedName: "companies_Scores",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Number",
            },
          },
        },
      },
      highScore: {
        serializedName: "highScore",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Number",
            },
          },
        },
      },
      midScore: {
        serializedName: "midScore",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Number",
            },
          },
        },
      },
      lowScore: {
        serializedName: "lowScore",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Number",
            },
          },
        },
      },
      result: {
        serializedName: "result",
        required: true,
        type: {
          name: "Number",
        },
      },
      articleSentiment: {
        serializedName: "articleSentiment",
        nullable: true,
        type: {
          name: "String",
        },
      },
      sentimentScore: {
        serializedName: "sentimentScore",
        type: {
          name: "Number",
        },
      },
    },
  },
};

export const AddCompanyRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "AddCompanyRequest",
    modelProperties: {
      name: {
        serializedName: "name",
        nullable: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const CompanyResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CompanyResponse",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "Uuid",
        },
      },
      name: {
        constraints: {
          MinLength: 1,
        },
        serializedName: "name",
        required: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const FeedbackRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "FeedbackRequest",
    modelProperties: {
      topicId: {
        serializedName: "topicId",
        nullable: true,
        type: {
          name: "String",
        },
      },
      articleId: {
        serializedName: "articleId",
        nullable: true,
        type: {
          name: "String",
        },
      },
      articleUrl: {
        serializedName: "articleUrl",
        nullable: true,
        type: {
          name: "String",
        },
      },
      highScore: {
        serializedName: "highScore",
        nullable: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Number",
            },
          },
        },
      },
      midScore: {
        serializedName: "midScore",
        nullable: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Number",
            },
          },
        },
      },
      lowScore: {
        serializedName: "lowScore",
        nullable: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Number",
            },
          },
        },
      },
      finalScore: {
        serializedName: "finalScore",
        type: {
          name: "Number",
        },
      },
      rated: {
        serializedName: "rated",
        type: {
          name: "Boolean",
        },
      },
      relatedCompanies: {
        serializedName: "relatedCompanies",
        nullable: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String",
            },
          },
        },
      },
      articleSentiment: {
        serializedName: "articleSentiment",
        nullable: true,
        type: {
          name: "String",
        },
      },
      reviewer: {
        serializedName: "reviewer",
        nullable: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const FeedbackResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "FeedbackResponse",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "Uuid",
        },
      },
      topicId: {
        serializedName: "topicId",
        required: true,
        type: {
          name: "Uuid",
        },
      },
      articleId: {
        serializedName: "articleId",
        required: true,
        type: {
          name: "Uuid",
        },
      },
      articleUrl: {
        serializedName: "articleUrl",
        nullable: true,
        type: {
          name: "String",
        },
      },
      highScore: {
        serializedName: "highScore",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Number",
            },
          },
        },
      },
      midScore: {
        serializedName: "midScore",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Number",
            },
          },
        },
      },
      lowScore: {
        serializedName: "lowScore",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Number",
            },
          },
        },
      },
      finalScore: {
        serializedName: "finalScore",
        required: true,
        type: {
          name: "Number",
        },
      },
      rated: {
        serializedName: "rated",
        required: true,
        type: {
          name: "Boolean",
        },
      },
      relatedCompanies: {
        serializedName: "relatedCompanies",
        nullable: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String",
            },
          },
        },
      },
      articleSentiment: {
        constraints: {
          MinLength: 1,
        },
        serializedName: "articleSentiment",
        required: true,
        type: {
          name: "String",
        },
      },
      createdOn: {
        constraints: {
          MinLength: 1,
        },
        serializedName: "createdOn",
        required: true,
        type: {
          name: "String",
        },
      },
      reviewer: {
        constraints: {
          MinLength: 1,
        },
        serializedName: "reviewer",
        required: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const NewArticleResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "NewArticleResponse",
    modelProperties: {
      source: {
        constraints: {
          MinLength: 1,
        },
        serializedName: "source",
        required: true,
        type: {
          name: "String",
        },
      },
      author: {
        constraints: {
          MinLength: 1,
        },
        serializedName: "author",
        required: true,
        type: {
          name: "String",
        },
      },
      url: {
        constraints: {
          MinLength: 1,
        },
        serializedName: "url",
        required: true,
        type: {
          name: "String",
        },
      },
      title: {
        constraints: {
          MinLength: 1,
        },
        serializedName: "title",
        required: true,
        type: {
          name: "String",
        },
      },
      description: {
        constraints: {
          MinLength: 1,
        },
        serializedName: "description",
        required: true,
        type: {
          name: "String",
        },
      },
      content: {
        constraints: {
          MinLength: 1,
        },
        serializedName: "content",
        required: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const AddLabelRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "AddLabelRequest",
    modelProperties: {
      item: {
        serializedName: "item",
        nullable: true,
        type: {
          name: "String",
        },
      },
      score: {
        serializedName: "score",
        type: {
          name: "Number",
        },
      },
      priority: {
        serializedName: "priority",
        type: {
          name: "Number",
        },
      },
      articleId: {
        serializedName: "articleId",
        type: {
          name: "Uuid",
        },
      },
    },
  },
};

export const GetLabelByArticleIdRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "GetLabelByArticleIdRequest",
    modelProperties: {
      articleId: {
        serializedName: "articleId",
        type: {
          name: "Uuid",
        },
      },
    },
  },
};

export const UpdateLabelRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpdateLabelRequest",
    modelProperties: {
      labelId: {
        serializedName: "labelId",
        type: {
          name: "Uuid",
        },
      },
      item: {
        serializedName: "item",
        nullable: true,
        type: {
          name: "String",
        },
      },
      score: {
        serializedName: "score",
        type: {
          name: "Number",
        },
      },
      priority: {
        serializedName: "priority",
        type: {
          name: "Number",
        },
      },
      articleId: {
        serializedName: "articleId",
        type: {
          name: "Uuid",
        },
      },
    },
  },
};

export const GetTopNewArticlesRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "GetTopNewArticlesRequest",
    modelProperties: {
      topicId: {
        serializedName: "topicId",
        type: {
          name: "Uuid",
        },
      },
    },
  },
};

export const AddNewArticleRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "AddNewArticleRequest",
    modelProperties: {
      source: {
        serializedName: "source",
        nullable: true,
        type: {
          name: "String",
        },
      },
      author: {
        serializedName: "author",
        nullable: true,
        type: {
          name: "String",
        },
      },
      url: {
        serializedName: "url",
        nullable: true,
        type: {
          name: "String",
        },
      },
      title: {
        serializedName: "title",
        nullable: true,
        type: {
          name: "String",
        },
      },
      description: {
        serializedName: "description",
        nullable: true,
        type: {
          name: "String",
        },
      },
      content: {
        serializedName: "content",
        nullable: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const AddNewArticleResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "AddNewArticleResponse",
    modelProperties: {
      id: {
        constraints: {
          MinLength: 1,
        },
        serializedName: "id",
        required: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const AddNewLabelRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "AddNewLabelRequest",
    modelProperties: {
      item: {
        serializedName: "item",
        nullable: true,
        type: {
          name: "String",
        },
      },
      score: {
        serializedName: "score",
        type: {
          name: "Number",
        },
      },
      priority: {
        serializedName: "priority",
        type: {
          name: "Number",
        },
      },
      topicId: {
        serializedName: "topicId",
        type: {
          name: "Uuid",
        },
      },
    },
  },
};

export const NewLabelResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "NewLabelResponse",
    modelProperties: {
      newLabelId: {
        serializedName: "newLabelId",
        type: {
          name: "Uuid",
        },
      },
      item: {
        serializedName: "item",
        nullable: true,
        type: {
          name: "String",
        },
      },
      score: {
        serializedName: "score",
        type: {
          name: "Number",
        },
      },
      priority: {
        serializedName: "priority",
        type: {
          name: "Number",
        },
      },
      topicId: {
        serializedName: "topicId",
        type: {
          name: "Uuid",
        },
      },
    },
  },
};

export const GetLabelByTopicIdRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "GetLabelByTopicIdRequest",
    modelProperties: {
      topicId: {
        serializedName: "topicId",
        type: {
          name: "Uuid",
        },
      },
    },
  },
};

export const UpdateNewLabelRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpdateNewLabelRequest",
    modelProperties: {
      newLabelId: {
        serializedName: "newLabelId",
        type: {
          name: "Uuid",
        },
      },
      item: {
        serializedName: "item",
        nullable: true,
        type: {
          name: "String",
        },
      },
      score: {
        serializedName: "score",
        type: {
          name: "Number",
        },
      },
      priority: {
        serializedName: "priority",
        type: {
          name: "Number",
        },
      },
      topicId: {
        serializedName: "topicId",
        type: {
          name: "Uuid",
        },
      },
    },
  },
};

export const CreateTopicRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CreateTopicRequest",
    modelProperties: {
      topicName: {
        serializedName: "topicName",
        nullable: true,
        type: {
          name: "String",
        },
      },
      labels: {
        serializedName: "labels",
        nullable: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "NewLabelResponse",
            },
          },
        },
      },
    },
  },
};

export const TopicResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "TopicResponse",
    modelProperties: {
      topicId: {
        serializedName: "topicId",
        type: {
          name: "Uuid",
        },
      },
      topicName: {
        serializedName: "topicName",
        nullable: true,
        type: {
          name: "String",
        },
      },
      labels: {
        serializedName: "labels",
        nullable: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "NewLabelResponse",
            },
          },
        },
      },
    },
  },
};

export const UpdateTopicRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UpdateTopicRequest",
    modelProperties: {
      topicId: {
        serializedName: "topicId",
        type: {
          name: "Uuid",
        },
      },
      topicName: {
        serializedName: "topicName",
        nullable: true,
        type: {
          name: "String",
        },
      },
      labels: {
        serializedName: "labels",
        nullable: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "NewLabelResponse",
            },
          },
        },
      },
    },
  },
};
