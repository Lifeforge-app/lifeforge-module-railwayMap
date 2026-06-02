export const contract = {
  "getLines": {
    "method": "get",
    "description": "Get all railway lines",
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
            "country": {
              "type": "string"
            },
            "type": {
              "type": "string"
            },
            "code": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "color": {
              "type": "string"
            },
            "ways": {},
            "map_paths": {},
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
            "country",
            "type",
            "code",
            "name",
            "color",
            "ways",
            "map_paths",
            "id",
            "collectionId",
            "collectionName"
          ],
          "additionalProperties": false
        }
      }
    }
  },
  "getStations": {
    "method": "get",
    "description": "Get all railway stations",
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
            "name": {
              "type": "string"
            },
            "desc": {
              "type": "string"
            },
            "lines": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "codes": {},
            "coords": {},
            "map_data": {},
            "type": {
              "type": "string"
            },
            "distances": {},
            "map_image": {
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
            "desc",
            "lines",
            "codes",
            "coords",
            "map_data",
            "type",
            "distances",
            "map_image",
            "id",
            "collectionId",
            "collectionName"
          ],
          "additionalProperties": false
        }
      }
    }
  },
  "getShortestPath": {
    "method": "get",
    "description": "Calculate shortest route between stations",
    "noAuth": false,
    "encrypted": true,
    "isDownloadable": false,
    "media": null,
    "input": {
      "query": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "type": "object",
        "properties": {
          "start": {
            "type": "string"
          },
          "end": {
            "type": "string"
          }
        },
        "required": [
          "start",
          "end"
        ],
        "additionalProperties": false
      }
    },
    "output": {
      "OK": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "desc": {
              "type": "string"
            },
            "lines": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "codes": {},
            "coords": {},
            "map_data": {},
            "type": {
              "type": "string"
            },
            "distances": {},
            "map_image": {
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
            "desc",
            "lines",
            "codes",
            "coords",
            "map_data",
            "type",
            "distances",
            "map_image",
            "id",
            "collectionId",
            "collectionName"
          ],
          "additionalProperties": false
        }
      },
      "BAD_REQUEST": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "type": "string"
      },
      "NOT_FOUND": true
    }
  }
} as const

export default contract
