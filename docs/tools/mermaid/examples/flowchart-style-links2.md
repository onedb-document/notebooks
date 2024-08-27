```mermaid
%%{ init: { 'flowchart': { 'curve': 'stepBefore' } } }%%
flowchart LR
    A --> B --- C -.- D
    A ==> B ==> C -.-> D
    linkStyle 1,3 stroke:#ff3,stroke-width:4px,color:red;
```
