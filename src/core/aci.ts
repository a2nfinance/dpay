export const DaoRegistryACI = [
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

export const DaoACI = [{
  "contract": {
    "functions": [
      {
        "arguments": [
          {
            "name": "dao",
            "type": "DAO.state"
          }
        ],
        "name": "init",
        "payable": false,
        "returns": "DAO.state",
        "stateful": false
      },
      {
        "arguments": [],
        "name": "get",
        "payable": false,
        "returns": "DAO.state",
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
            "name": "proposal_type",
            "type": "int"
          },
          {
            "name": "recipients",
            "type": {
              "map": [
                "address",
                "int"
              ]
            }
          },
          {
            "name": "start_date",
            "type": "int"
          },
          {
            "name": "stop_date",
            "type": "int"
          }
        ],
        "name": "create_proposal",
        "payable": false,
        "returns": {
          "tuple": []
        },
        "stateful": true
      },
      {
        "arguments": [
          {
            "name": "index",
            "type": "int"
          },
          {
            "name": "vote_value",
            "type": "bool"
          }
        ],
        "name": "vote",
        "payable": false,
        "returns": {
          "tuple": []
        },
        "stateful": true
      },
      {
        "arguments": [],
        "name": "get_proposals",
        "payable": false,
        "returns": {
          "list": [
            {
              "tuple": [
                "int",
                "DAO.proposal"
              ]
            }
          ]
        },
        "stateful": false
      },
      {
        "arguments": [],
        "name": "fund",
        "payable": true,
        "returns": {
          "tuple": []
        },
        "stateful": true
      },
      {
        "arguments": [
          {
            "name": "index",
            "type": "int"
          }
        ],
        "name": "execute_proposal",
        "payable": false,
        "returns": "int",
        "stateful": true
      },
      {
        "arguments": [],
        "name": "get_contract_balance",
        "payable": false,
        "returns": "int",
        "stateful": false
      },
      {
        "arguments": [
          {
            "name": "new_member",
            "type": "address"
          }
        ],
        "name": "add_memmber",
        "payable": false,
        "returns": "bool",
        "stateful": true
      },
      {
        "arguments": [
          {
            "name": "member",
            "type": "address"
          }
        ],
        "name": "remove_member",
        "payable": false,
        "returns": "bool",
        "stateful": true
      }
    ],
    "kind": "contract_child",
    "name": "DAO",
    "payable": false,
    "state": {
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
          "name": "proposals",
          "type": {
            "map": [
              "int",
              "DAO.proposal"
            ]
          }
        },
        {
          "name": "member_fund",
          "type": {
            "map": [
              "address",
              "int"
            ]
          }
        },
        {
          "name": "contributor_fund",
          "type": {
            "map": [
              "address",
              "int"
            ]
          }
        }
      ]
    },
    "typedefs": [
      {
        "name": "proposal",
        "typedef": {
          "record": [
            {
              "name": "title",
              "type": "string"
            },
            {
              "name": "description",
              "type": "string"
            },
            {
              "name": "creator",
              "type": "address"
            },
            {
              "name": "proposal_type",
              "type": "int"
            },
            {
              "name": "recipients",
              "type": {
                "map": [
                  "address",
                  "int"
                ]
              }
            },
            {
              "name": "start_date",
              "type": "int"
            },
            {
              "name": "stop_date",
              "type": "int"
            },
            {
              "name": "voters",
              "type": {
                "map": [
                  "address",
                  "bool"
                ]
              }
            },
            {
              "name": "executed",
              "type": "bool"
            }
          ]
        },
        "vars": []
      }
    ]
  }
}]  