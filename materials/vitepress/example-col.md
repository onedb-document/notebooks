::::vp_col

:::vp_col_item

```mermaid
classDiagram
    %% 方式1
    class Animal["Animal with a label"]
    %% 方式2
    Vehicle <|-- Car
```

:::

:::vp_col_item

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle
actor customer
actor clerk
rectangle checkout {
  customer -- (checkout)
  (checkout) .> (payment) : include
  (help) .> (checkout) : extends
  (checkout) -- clerk
}
@enduml
```

:::

:::vp_col_item
**aaa**
:::

::::

---
