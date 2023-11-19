CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE status AS ENUM ('OPEN', 'ORDERED');
CREATE TABLE IF NOT EXISTS carts (
                                     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                     user_id UUID NOT NULL,
                                     created_on TIMESTAMP NOT NULL,
                                     updated_on TIMESTAMP NOT NULL,
                                     status status
);

CREATE TABLE IF NOT EXISTS cart_items (
    cart_id uuid,
    product_id uuid,
    count INTEGER
);

ALTER TABLE cart_items
    ADD CONSTRAINT fk_carts_cart_id
    FOREIGN KEY(cart_id)
    REFERENCES carts(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

INSERT INTO carts(user_id, created_on, updated_on, status)
VALUES('3b456463-ab12-4247-8b42-9ed7b0edeabd', '2016-06-22 19:10:25-07', '2016-06-22 19:10:25-07', 'OPEN'),
      ('3b456463-ab12-4247-8b42-9ed7b0edeabd', '2016-06-22 19:10:25-07', '2016-07-24 19:10:25-07', 'OPEN'),
      ('3b456463-ab12-4247-8b42-9ed7b0edeabd', '2016-06-22 19:10:25-07', '2016-08-25 19:10:25-07', 'ORDERED'),
      ('21898a1e-6126-40cd-b45c-6525e08510b0', '2016-06-22 19:10:25-07', '2016-09-26 19:10:25-07', 'OPEN'),
      ('21898a1e-6126-40cd-b45c-6525e08510b0', '2016-06-22 19:10:25-07', '2016-10-27 19:10:25-07', 'ORDERED'),
      ('15263230-c5db-4921-a467-22e968be6ca5', '2016-06-22 19:10:25-07', '2016-11-28 19:10:25-07', 'OPEN');

INSERT INTO cart_items(cart_id, product_id, count)
VALUES ('611e8b98-f57c-4287-96e3-c2b10ee38d42', '7567ec4b-b10c-48c5-9345-fc73c48a80aa', 4),
       ('6eb9cea6-6748-4fcd-b4d6-44753cbb3ae4', '7567ec4b-b10c-48c5-9345-fc73c48a80aa', 12),
       ('94e41526-ae72-4b50-8118-05aab29d03c0', '7567ec4b-b10c-48c5-9345-fc73c48a80a3', 9),
       ('534cbc5b-f7f7-4fac-a6da-c13d95f18bfe', '7567ec4b-b10c-48c5-9345-fc73348a80a1', 2),
       ('af3bd779-42e1-4e9a-a6fc-6a379209d7e1', '7567ec4b-b10c-48c5-9345-fc73c48a80a0', 1),
       ('7b3ef4ad-4a8f-417e-ab12-1843bc6b6b81', '7567ec4b-b10c-48c5-9345-fc73c48a80a3', 3);

DELETE FROM carts WHERE id = '0439f764-e812-45ee-b386-38eb26d698ca';