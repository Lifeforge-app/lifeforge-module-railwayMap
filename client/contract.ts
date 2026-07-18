export const contract = {
  "listMaps": {
    "method": "get",
    "description": "Get all railway maps",
    "noAuth": false,
    "encrypted": true,
    "isDownloadable": false,
    "media": null,
    "input": {},
    "output": {
      "OK": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "country": {
              "type": "string"
            },
            "lineCount": {
              "type": "number"
            },
            "stationCount": {
              "type": "number"
            },
            "lines": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "color": {
                    "type": "string"
                  },
                  "name": {
                    "type": "string"
                  },
                  "code": {
                    "type": "string"
                  },
                  "path": {
                    "type": "array",
                    "items": {
                      "type": "array",
                      "items": {
                        "type": "number"
                      }
                    }
                  }
                },
                "required": [
                  "color",
                  "name",
                  "code",
                  "path"
                ],
                "additionalProperties": false
              }
            },
            "stations": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "x": {
                    "type": "number"
                  },
                  "y": {
                    "type": "number"
                  },
                  "name": {
                    "type": "string"
                  },
                  "lines": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "type": {
                    "type": "string",
                    "enum": [
                      "station",
                      "interchange"
                    ]
                  },
                  "codes": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "textOffsetX": {
                    "type": "number"
                  },
                  "textOffsetY": {
                    "type": "number"
                  },
                  "textAnchor": {
                    "type": "string"
                  }
                },
                "required": [
                  "id",
                  "x",
                  "y",
                  "name",
                  "lines",
                  "type"
                ],
                "additionalProperties": false
              }
            }
          },
          "required": [
            "id",
            "name",
            "country",
            "lineCount",
            "stationCount",
            "lines",
            "stations"
          ],
          "additionalProperties": false
        }
      }
    }
  },
  "getMap": {
    "method": "get",
    "description": "Get railway map data by id",
    "noAuth": false,
    "encrypted": true,
    "isDownloadable": false,
    "media": null,
    "input": {
      "query": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          }
        },
        "required": [
          "id"
        ],
        "additionalProperties": false
      }
    },
    "output": {
      "OK": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "country": {
            "type": "string"
          },
          "created": {
            "type": "string"
          },
          "updated": {
            "type": "string"
          },
          "id": {
            "type": "string"
          },
          "collectionId": {
            "type": "string"
          },
          "collectionName": {
            "type": "string"
          },
          "lines": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "color": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                },
                "code": {
                  "type": "string"
                },
                "path": {
                  "type": "array",
                  "items": {
                    "type": "array",
                    "items": {
                      "type": "number"
                    }
                  }
                }
              },
              "required": [
                "color",
                "name",
                "code",
                "path"
              ],
              "additionalProperties": false
            }
          },
          "stations": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string"
                },
                "x": {
                  "type": "number"
                },
                "y": {
                  "type": "number"
                },
                "name": {
                  "type": "string"
                },
                "lines": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "type": {
                  "type": "string",
                  "enum": [
                    "station",
                    "interchange"
                  ]
                },
                "codes": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "textOffsetX": {
                  "type": "number"
                },
                "textOffsetY": {
                  "type": "number"
                },
                "textAnchor": {
                  "type": "string"
                }
              },
              "required": [
                "id",
                "x",
                "y",
                "name",
                "lines",
                "type"
              ],
              "additionalProperties": false
            }
          }
        },
        "required": [
          "name",
          "country",
          "created",
          "updated",
          "id",
          "collectionId",
          "collectionName",
          "lines",
          "stations"
        ],
        "additionalProperties": false
      },
      "NOT_FOUND": true
    }
  },
  "createMap": {
    "method": "post",
    "description": "Create a new railway map",
    "noAuth": false,
    "encrypted": true,
    "isDownloadable": false,
    "media": null,
    "input": {
      "body": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1
          },
          "country": {
            "type": "string",
            "minLength": 1
          },
          "lines": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "color": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                },
                "code": {
                  "type": "string"
                },
                "path": {
                  "type": "array",
                  "items": {
                    "type": "array",
                    "items": {
                      "type": "number"
                    }
                  }
                }
              },
              "required": [
                "color",
                "name",
                "code",
                "path"
              ],
              "additionalProperties": false
            }
          },
          "stations": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string"
                },
                "x": {
                  "type": "number"
                },
                "y": {
                  "type": "number"
                },
                "name": {
                  "type": "string"
                },
                "lines": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "type": {
                  "type": "string",
                  "enum": [
                    "station",
                    "interchange"
                  ]
                },
                "codes": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "textOffsetX": {
                  "type": "number"
                },
                "textOffsetY": {
                  "type": "number"
                },
                "textAnchor": {
                  "type": "string"
                }
              },
              "required": [
                "id",
                "x",
                "y",
                "name",
                "lines",
                "type"
              ],
              "additionalProperties": false
            }
          }
        },
        "required": [
          "name",
          "country",
          "lines",
          "stations"
        ],
        "additionalProperties": false
      }
    },
    "output": {
      "CREATED": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "country": {
            "type": "string"
          },
          "lines": {},
          "stations": {},
          "created": {
            "type": "string"
          },
          "updated": {
            "type": "string"
          },
          "id": {
            "type": "string"
          },
          "collectionId": {
            "type": "string"
          },
          "collectionName": {
            "type": "string"
          }
        },
        "required": [
          "name",
          "country",
          "lines",
          "stations",
          "created",
          "updated",
          "id",
          "collectionId",
          "collectionName"
        ],
        "additionalProperties": false
      }
    }
  }
} as const

export default contract
