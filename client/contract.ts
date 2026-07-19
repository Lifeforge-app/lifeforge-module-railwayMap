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
  },
  "signs": {
    "list": {
      "method": "get",
      "description": "Get all station signs",
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
              "image": {
                "type": "string"
              },
              "station_code": {
                "type": "string"
              },
              "cropped_image": {
                "type": "string"
              },
              "crop_coords": {},
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
              "image",
              "station_code",
              "cropped_image",
              "crop_coords",
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
    },
    "remove": {
      "method": "post",
      "description": "Delete a station sign",
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
        "NO_CONTENT": true,
        "NOT_FOUND": true
      }
    },
    "update": {
      "method": "post",
      "description": "Update station sign with new perspective coords",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": {
        "image": {
          "optional": false
        }
      },
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
        },
        "body": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "coords": {
              "type": "object",
              "properties": {
                "topLeft": {
                  "type": "object",
                  "properties": {
                    "x": {
                      "type": "number"
                    },
                    "y": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "x",
                    "y"
                  ],
                  "additionalProperties": false
                },
                "topRight": {
                  "type": "object",
                  "properties": {
                    "x": {
                      "type": "number"
                    },
                    "y": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "x",
                    "y"
                  ],
                  "additionalProperties": false
                },
                "bottomRight": {
                  "type": "object",
                  "properties": {
                    "x": {
                      "type": "number"
                    },
                    "y": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "x",
                    "y"
                  ],
                  "additionalProperties": false
                },
                "bottomLeft": {
                  "type": "object",
                  "properties": {
                    "x": {
                      "type": "number"
                    },
                    "y": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "x",
                    "y"
                  ],
                  "additionalProperties": false
                }
              },
              "required": [
                "topLeft",
                "topRight",
                "bottomRight",
                "bottomLeft"
              ],
              "additionalProperties": false
            }
          },
          "required": [
            "coords"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "CREATED": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "image": {
              "type": "string"
            },
            "station_code": {
              "type": "string"
            },
            "cropped_image": {
              "type": "string"
            },
            "crop_coords": {},
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
            "image",
            "station_code",
            "cropped_image",
            "crop_coords",
            "created",
            "updated",
            "id",
            "collectionId",
            "collectionName"
          ],
          "additionalProperties": false
        },
        "BAD_REQUEST": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "string"
        },
        "NOT_FOUND": true
      }
    },
    "upload": {
      "method": "post",
      "description": "Upload station sign photo with perspective correction",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": {
        "image": {
          "optional": false
        }
      },
      "input": {
        "body": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "station_code": {
              "type": "string",
              "minLength": 1
            },
            "coords": {
              "type": "object",
              "properties": {
                "topLeft": {
                  "type": "object",
                  "properties": {
                    "x": {
                      "type": "number"
                    },
                    "y": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "x",
                    "y"
                  ],
                  "additionalProperties": false
                },
                "topRight": {
                  "type": "object",
                  "properties": {
                    "x": {
                      "type": "number"
                    },
                    "y": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "x",
                    "y"
                  ],
                  "additionalProperties": false
                },
                "bottomRight": {
                  "type": "object",
                  "properties": {
                    "x": {
                      "type": "number"
                    },
                    "y": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "x",
                    "y"
                  ],
                  "additionalProperties": false
                },
                "bottomLeft": {
                  "type": "object",
                  "properties": {
                    "x": {
                      "type": "number"
                    },
                    "y": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "x",
                    "y"
                  ],
                  "additionalProperties": false
                }
              },
              "required": [
                "topLeft",
                "topRight",
                "bottomRight",
                "bottomLeft"
              ],
              "additionalProperties": false
            }
          },
          "required": [
            "station_code",
            "coords"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "CREATED": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "image": {
              "type": "string"
            },
            "station_code": {
              "type": "string"
            },
            "cropped_image": {
              "type": "string"
            },
            "crop_coords": {},
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
            "image",
            "station_code",
            "cropped_image",
            "crop_coords",
            "created",
            "updated",
            "id",
            "collectionId",
            "collectionName"
          ],
          "additionalProperties": false
        },
        "BAD_REQUEST": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "string"
        }
      }
    }
  }
} as const

export default contract
