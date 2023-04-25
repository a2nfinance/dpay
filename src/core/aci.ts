export const ACI = [
    {
      "contract": {
        "functions": [
          {
            "arguments": [],
            "name": "init",
            "payable": false,
            "returns": "DAORegistry.state",
            "stateful": false
          },
          {
            "arguments": [
              {
                "name": "title",
                "type": "string"
              },
              {
                "name": "description",
                "type": "string"
              },
              {
                "name": "members",
                "type": {
                  "list": [
                    "address"
                  ]
                }
              },
              {
                "name": "parent_dao",
                "type": {
                  "option": [
                    "address"
                  ]
                }
              }
            ],
            "name": "create_dao",
            "payable": false,
            "returns": {
              "tuple": []
            },
            "stateful": true
          },
          {
            "arguments": [],
            "name": "get_daos",
            "payable": false,
            "returns": {
              "list": [
                {
                  "tuple": [
                    "address",
                    "DAORegistry.dao"
                  ]
                }
              ]
            },
            "stateful": false
          },
          {
            "arguments": [
              {
                "name": "parent_dao",
                "type": "address"
              }
            ],
            "name": "get_sub_daos_of",
            "payable": false,
            "returns": {
              "list": [
                {
                  "tuple": [
                    "address",
                    "DAORegistry.dao"
                  ]
                }
              ]
            },
            "stateful": false
          }
        ],
        "kind": "contract_main",
        "name": "DAORegistry",
        "payable": false,
        "state": {
          "record": [
            {
              "name": "daos",
              "type": {
                "map": [
                  "address",
                  "DAORegistry.dao"
                ]
              }
            },
            {
              "name": "sub_daos",
              "type": {
                "map": [
                  "address",
                  {
                    "list": [
                      "address"
                    ]
                  }
                ]
              }
            }
          ]
        },
        "typedefs": [
          {
            "name": "dao",
            "typedef": {
              "record": [
                {
                  "name": "owner",
                  "type": "address"
                },
                {
                  "name": "title",
                  "type": "string"
                },
                {
                  "name": "description",
                  "type": "string"
                }
              ]
            },
            "vars": []
          }
        ]
      }
    }
  ]