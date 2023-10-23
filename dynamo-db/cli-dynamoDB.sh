aws dynamodb create-table \
    --table-name products \
    --attribute-definitions \
        AttributeName=id,AttributeType=S \
    --key-schema \
        AttributeName=id,KeyType=HASH \
    --provisioned-throughput \
        ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --table-class STANDARD

aws dynamodb create-table \
    --table-name stocks \
    --attribute-definitions \
        AttributeName=product_id,AttributeType=S \
    --key-schema \
        AttributeName=product_id,KeyType=HASH \
    --provisioned-throughput \
        ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --table-class STANDARD

aws dynamodb put-item \
    --table-name products \
    --item '{"id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a0"}, "title": {"S": "apples"}, "description": {"S": "From console 1"}, "price": {"N": "4.5"}}'

aws dynamodb put-item \
    --table-name products \
    --item '{"id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a2"}, "title": {"S": "grape"}, "description": {"S": "From console 2"}, "price": {"N": "2.5"}}'

aws dynamodb put-item \
    --table-name products \
    --item '{"id": {"S": "77567ec4b-b10c-48c5-9345-fc73c48a80aa"}, "title": {"S": "oranges"}, "description": {"S": "From console 3"}, "price": {"N": "2.3"}}'

aws dynamodb put-item \
    --table-name products \
    --item '{"id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a1"}, "title": {"S": "lemons"}, "description": {"S": "From console 4"}, "price": {"N": "2.1"}}'

aws dynamodb put-item \
    --table-name products \
    --item '{"id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a3"}, "title": {"S": "melons"}, "description": {"S": "From console 5"}, "price": {"N": "4.7"}}'

aws dynamodb put-item \
    --table-name products \
    --item '{"id": {"S": "7567ec4b-b10c-48c5-9345-fc73348a80a1"}, "title": {"S": "watermelons"}, "description": {"S": "From console 6"}, "price": {"N": "1.2"}}'

aws dynamodb put-item \
    --table-name stocks \
    --item '{"product_id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a0"}, "count": {"N": "20"}}'

aws dynamodb put-item \
    --table-name stocks \
    --item '{"product_id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a2"}, "count": {"N": "24"}}'

aws dynamodb put-item \
    --table-name stocks \
    --item '{"product_id": {"S": "77567ec4b-b10c-48c5-9345-fc73c48a80aa"}, "count": {"N": "14"}}'

aws dynamodb put-item \
    --table-name stocks \
    --item '{"product_id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a1"}, "count": {"N": "15"}}'

aws dynamodb put-item \
    --table-name stocks \
    --item '{"product_id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a3"}, "count": {"N": "24"}}'

aws dynamodb put-item \
    --table-name stocks \
    --item '{"product_id": {"S": "7567ec4b-b10c-48c5-9345-fc73348a80a1"}, "count": {"N": "34"}}'
