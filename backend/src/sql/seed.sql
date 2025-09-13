-- seed.sql
USE expense_tracker;

-- Users
INSERT INTO users (name, email, status) VALUES
('Alice Johnson','alice@example.com','ACTIVE'),
('Bob Smith','bob@example.com','ACTIVE'),
('Charlie Brown','charlie@example.com','INACTIVE'),
('David Miller','david@example.com','ACTIVE'),
('Eva Green','eva@example.com','ACTIVE'),
('Frank Harris','frank@example.com','ACTIVE'),
('Grace Lee','grace@example.com','ACTIVE'),
('Hannah White','hannah@example.com','ACTIVE'),
('Ian Black','ian@example.com','ACTIVE'),
('Julia Adams','julia@example.com','INACTIVE');

-- Categories
INSERT INTO categories (name) VALUES
('Food'),
('Transport'),
('Rent'),
('Shopping'),
('Utilities'),
('Entertainment'),
('Healthcare'),
('Education'),
('Travel'),
('Other');

-- Expenses (~40 rows, spread over July–Sept 2025)
INSERT INTO expenses (user_id, category, amount, date, description) VALUES
-- Alice
((SELECT id FROM users WHERE email='alice@example.com'), (SELECT id FROM categories WHERE name='Food'), 12.50, '2025-09-01 12:30:00', 'Lunch Subway'),
((SELECT id FROM users WHERE email='alice@example.com'), (SELECT id FROM categories WHERE name='Food'), 18.00, '2025-08-05 13:00:00', 'Dinner with friends'),
((SELECT id FROM users WHERE email='alice@example.com'), (SELECT id FROM categories WHERE name='Rent'), 700.00, '2025-07-01 09:00:00', 'July rent'),
((SELECT id FROM users WHERE email='alice@example.com'), (SELECT id FROM categories WHERE name='Rent'), 700.00, '2025-08-01 09:00:00', 'August rent'),
((SELECT id FROM users WHERE email='alice@example.com'), (SELECT id FROM categories WHERE name='Rent'), 700.00, '2025-09-01 09:00:00', 'September rent'),
((SELECT id FROM users WHERE email='alice@example.com'), (SELECT id FROM categories WHERE name='Utilities'), 60.00, '2025-08-20 18:00:00', 'Electricity bill'),
((SELECT id FROM users WHERE email='alice@example.com'), (SELECT id FROM categories WHERE name='Entertainment'), 40.00, '2025-09-10 20:00:00', 'Movie night'),

-- Bob
((SELECT id FROM users WHERE email='bob@example.com'), (SELECT id FROM categories WHERE name='Food'), 20.00, '2025-07-15 12:30:00', 'Lunch'),
((SELECT id FROM users WHERE email='bob@example.com'), (SELECT id FROM categories WHERE name='Food'), 25.00, '2025-09-03 13:30:00', 'Dinner'),
((SELECT id FROM users WHERE email='bob@example.com'), (SELECT id FROM categories WHERE name='Shopping'), 150.00, '2025-08-12 15:30:00', 'Clothes shopping'),
((SELECT id FROM users WHERE email='bob@example.com'), (SELECT id FROM categories WHERE name='Healthcare'), 50.00, '2025-07-28 10:00:00', 'Doctor visit'),
((SELECT id FROM users WHERE email='bob@example.com'), (SELECT id FROM categories WHERE name='Travel'), 300.00, '2025-09-05 07:00:00', 'Flight ticket'),

-- Charlie
((SELECT id FROM users WHERE email='charlie@example.com'), (SELECT id FROM categories WHERE name='Education'), 150.00, '2025-07-20 09:00:00', 'Online course'),
((SELECT id FROM users WHERE email='charlie@example.com'), (SELECT id FROM categories WHERE name='Education'), 200.00, '2025-08-07 09:00:00', 'Advanced course'),
((SELECT id FROM users WHERE email='charlie@example.com'), (SELECT id FROM categories WHERE name='Entertainment'), 30.00, '2025-09-15 21:00:00', 'Concert'),

-- David
((SELECT id FROM users WHERE email='david@example.com'), (SELECT id FROM categories WHERE name='Rent'), 750.00, '2025-07-01 09:00:00', 'July rent'),
((SELECT id FROM users WHERE email='david@example.com'), (SELECT id FROM categories WHERE name='Rent'), 750.00, '2025-08-01 09:00:00', 'August rent'),
((SELECT id FROM users WHERE email='david@example.com'), (SELECT id FROM categories WHERE name='Rent'), 750.00, '2025-09-01 09:00:00', 'September rent'),
((SELECT id FROM users WHERE email='david@example.com'), (SELECT id FROM categories WHERE name='Transport'), 35.00, '2025-08-10 08:30:00', 'Taxi'),
((SELECT id FROM users WHERE email='david@example.com'), (SELECT id FROM categories WHERE name='Other'), 20.00, '2025-09-11 12:00:00', 'Misc expense'),

-- Eva
((SELECT id FROM users WHERE email='eva@example.com'), (SELECT id FROM categories WHERE name='Food'), 22.00, '2025-09-07 13:30:00', 'Lunch'),
((SELECT id FROM users WHERE email='eva@example.com'), (SELECT id FROM categories WHERE name='Shopping'), 80.00, '2025-08-18 14:00:00', 'Shoes'),
((SELECT id FROM users WHERE email='eva@example.com'), (SELECT id FROM categories WHERE name='Travel'), 500.00, '2025-07-25 06:00:00', 'Trip booking'),

-- Frank
((SELECT id FROM users WHERE email='frank@example.com'), (SELECT id FROM categories WHERE name='Utilities'), 95.00, '2025-07-20 19:00:00', 'Water bill'),
((SELECT id FROM users WHERE email='frank@example.com'), (SELECT id FROM categories WHERE name='Utilities'), 105.00, '2025-08-20 19:00:00', 'Water bill'),
((SELECT id FROM users WHERE email='frank@example.com'), (SELECT id FROM categories WHERE name='Healthcare'), 120.00, '2025-09-01 10:00:00', 'Dental checkup'),

-- Grace
((SELECT id FROM users WHERE email='grace@example.com'), (SELECT id FROM categories WHERE name='Rent'), 680.00, '2025-07-01 09:00:00', 'July rent'),
((SELECT id FROM users WHERE email='grace@example.com'), (SELECT id FROM categories WHERE name='Rent'), 680.00, '2025-08-01 09:00:00', 'August rent'),
((SELECT id FROM users WHERE email='grace@example.com'), (SELECT id FROM categories WHERE name='Rent'), 680.00, '2025-09-01 09:00:00', 'September rent'),
((SELECT id FROM users WHERE email='grace@example.com'), (SELECT id FROM categories WHERE name='Entertainment'), 35.00, '2025-08-16 20:00:00', 'Streaming subscription'),

-- Hannah
((SELECT id FROM users WHERE email='hannah@example.com'), (SELECT id FROM categories WHERE name='Education'), 200.00, '2025-08-14 18:00:00', 'College fees'),
((SELECT id FROM users WHERE email='hannah@example.com'), (SELECT id FROM categories WHERE name='Transport'), 25.00, '2025-09-04 07:00:00', 'Bus pass'),

-- Ian
((SELECT id FROM users WHERE email='ian@example.com'), (SELECT id FROM categories WHERE name='Food'), 15.00, '2025-07-19 12:00:00', 'Lunch'),
((SELECT id FROM users WHERE email='ian@example.com'), (SELECT id FROM categories WHERE name='Food'), 17.00, '2025-08-19 12:00:00', 'Lunch'),
((SELECT id FROM users WHERE email='ian@example.com'), (SELECT id FROM categories WHERE name='Food'), 19.00, '2025-09-09 12:00:00', 'Lunch'),
((SELECT id FROM users WHERE email='ian@example.com'), (SELECT id FROM categories WHERE name='Shopping'), 100.00, '2025-08-22 17:00:00', 'Mall shopping'),

-- Julia
((SELECT id FROM users WHERE email='julia@example.com'), (SELECT id FROM categories WHERE name='Travel'), 400.00, '2025-07-01 06:30:00', 'Vacation trip'),
((SELECT id FROM users WHERE email='julia@example.com'), (SELECT id FROM categories WHERE name='Travel'), 420.00, '2025-08-01 06:30:00', 'Vacation trip'),
((SELECT id FROM users WHERE email='julia@example.com'), (SELECT id FROM categories WHERE name='Travel'), 450.00, '2025-09-01 06:30:00', 'Vacation trip'),
((SELECT id FROM users WHERE email='julia@example.com'), (SELECT id FROM categories WHERE name='Entertainment'), 55.00, '2025-08-11 20:00:00', 'Theater show'),
((SELECT id FROM users WHERE email='julia@example.com'), (SELECT id FROM categories WHERE name='Food'), 25.00, '2025-09-12 12:00:00', 'Dinner');
