# Swagger Tools

![https://swagger.io/specification/](https://img.shields.io/badge/Learn-181717?style=for-the-badge&logo=swagger)
![https://swagger.io/specification/](https://img.shields.io/badge/Install-181717?style=for-the-badge&logo=visual-studio-code&color=blueviolet)
![https://www.patreon.com/aarondovturkel](https://img.shields.io/badge/Donate-181717?style=for-the-badge&logo=patreon&color=blue)

A VSCode extension that scaffolds [openAPI (swagger) specs](https://swagger.io/specification/) from your editor.
Get it on the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=TheHolyCoder.swagger-tools).

Got any feedback, issues or feature requests? Send them my way via [GitHub Issues](https://github.com/AaronDovTurkel/swagger-tools/issues).

- [Swagger Tools](#swagger-tools)
  - [Commands](#commands)
  - [Settings](#settings)
  - [Features](#features)
    - [*Generate & Paste Schema Object*](#generate--paste-schema-object)
    - [*Generate Components*](#generate-components)
  - [Upcoming Features](#upcoming-features)
    - [*Scaffold New Spec*](#scaffold-new-spec)
    - [*Generate Components Continued...*](#generate-components-continued)
    - [*Generate Paths*](#generate-paths)
    - [*More to come...*](#more-to-come)
  - [Author](#author)
    - [Contributors](#contributors)

See the [CHANGELOG](/CHANGELOG.md) for the latest changes.

## Commands

| Command name               | Description                                                               | Shortcut             |
| -------------------------- | ------------------------------------------------------------------------- | -------------------- |
| swagger-tools.pasteSchema  | Generates an openAPI schema from an object or array in the clipboard      | `ctrl/cmd + alt + v` |
| swagger-tools.addComponent | Adds an openAPI schema into the components spec field (optionally generated from clipboard) | `ctrl/cmd + alt + c` |

## Settings

`Settings → Extensions → Swagger Tools`

| Setting                 | Description                                       | Allowed Values                           |
| ----------------------- | ------------------------------------------------- | ---------------------------------------- |
| swagger-tools.arrayType | Specify the type of array you want auto generated | *"anyOf", "oneOf", "allOf", "not"* |

## Features

### *Generate & Paste Schema Object*

1. Copy the object or array you would like to generate
2. Go to the desired openAPI spec file
3. Place your cursor where you would like to paste your schema
4. Paste by typing the macro `ctrl/cmd + alt + v`

![Paste Schema - Gif](https://github.com/AaronDovTurkel/swagger-tools/blob/master/images/pasteSchemaTrimmed.gif?raw=true)

### *Generate Components*

Select from a list of components to generate fully scaffolded schemas.
The schemas will be auto inserted in its proper field.

- #### Schemas

1. Copy the object or array you would like to generate as a component schema
2. Go to the desired openAPI spec file
3. Paste by typing the macro `ctrl/cmd + alt + c`
4. Fill out schema info in command pallette

![Add Component: Schema - Gif](https://github.com/AaronDovTurkel/swagger-tools/blob/master/images/add-component-schema.gif?raw=true)

## Upcoming Features

The upcoming features list is order by expected release date...

### *Scaffold New Spec*

An easy and quick set up for anyone on the team.

- Scaffold a new spec from scratch
- Choose between a complex or basic spec

### *Generate Components Continued...*

Select from a list of components to generate fully scaffolded schemas.
The schemas will be auto inserted in its proper field.

Upcoming Releases:

- responses
- parameters
- examples
- requestBodies
- headers
- securitySchemes
- links
- callbacks

### *Generate Paths*

Fully generate paths with all their required fields.

- `GET, POST, PUT, PATCH, DELETE`

### *More to come...*

- Auto populate paths with request bodies, params, responses, etc...
- Linting
- Error decorators

## Author

Created and sustained by Aaron Turkel (a.k.a. [The Holy Coder](https://github.com/AaronDovTurkel)).

### Contributors

Have an idea that could make [Swagger Tools](#swagger-tools) better? [Contribute](https://github.com/AaronDovTurkel/swagger-tools)!
