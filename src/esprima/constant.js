{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "CONST_APP"
          },
          "init": {
            "type": "Literal",
            "value": "MyApp",
            "raw": "\"MyApp\""
          }
        }
      ],
      "kind": "var"
    },
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "CONST_INT"
          },
          "init": {
            "type": "Literal",
            "value": 3,
            "raw": "3"
          }
        }
      ],
      "kind": "var"
    },
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "CONST_FLOAT"
          },
          "init": {
            "type": "Literal",
            "value": 3.14,
            "raw": "3.14"
          }
        }
      ],
      "kind": "var"
    },
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "yOSON"
          },
          "init": {
            "type": "ObjectExpression",
            "properties": []
          }
        }
      ],
      "kind": "var"
    },
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "AssignmentExpression",
        "operator": "=",
        "left": {
          "type": "MemberExpression",
          "computed": false,
          "object": {
            "type": "Identifier",
            "name": "yOSON"
          },
          "property": {
            "type": "Identifier",
            "name": "version"
          }
        },
        "right": {
          "type": "Literal",
          "value": "0.0.1",
          "raw": "\"0.0.1\""
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "AssignmentExpression",
        "operator": "=",
        "left": {
          "type": "MemberExpression",
          "computed": false,
          "object": {
            "type": "Identifier",
            "name": "yOSON"
          },
          "property": {
            "type": "Identifier",
            "name": "statHost"
          }
        },
        "right": {
          "type": "Literal",
          "value": "http://cdn.statHost.com",
          "raw": "\"http://cdn.statHost.com\""
        }
      }
    }
  ]
}