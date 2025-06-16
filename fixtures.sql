-- 1. Users
INSERT INTO `User` (username, email, password_hash, created_at, last_login) VALUES
  ('alice', 'alice@example.com', '$2b$10$HashedPwdAlice', NOW() - INTERVAL 10 DAY, NOW() - INTERVAL 1 DAY),
  ('bob',   'bob@example.com',   '$2b$10$HashedPwdBob',   NOW() - INTERVAL  5 DAY, NOW() - INTERVAL 2 HOUR),
  ('carol', 'carol@example.com', '$2b$10$HashedPwdCarol', NOW() - INTERVAL  2 DAY, NULL);

-- 2. Wallets
INSERT INTO `Wallet` (user_id, created_at, initial_balance) VALUES
  (1, NOW() - INTERVAL 9 DAY, 10000.00),
  (2, NOW() - INTERVAL 4 DAY, 15000.00),
  (3, NOW() - INTERVAL 1 DAY,  20000.00);

-- 3. Wallet_Holding
INSERT INTO `Wallet_Holding` (wallet_id, crypto_symbol, quantity, average_price) VALUES
  (1, 'BTC', 0.50000000, 30000.00),
  (1, 'ETH', 2.00000000,  1800.00),
  (2, 'BTC', 1.20000000, 28000.00),
  (3, 'XRP', 500.00000000, 0.60);

-- 4. Trades
INSERT INTO `Trade` (holding_id, crypto_symbol, type, amount, price, fee, timestamp) VALUES
  (1, 'BTC', 'buy',  0.30000000, 29000.00, 10.00, NOW() - INTERVAL 8 DAY),
  (1, 'BTC', 'buy',  0.20000000, 31000.00, 12.00, NOW() - INTERVAL 7 DAY),
  (2, 'ETH', 'buy',  2.00000000, 1800.00,  5.00,  NOW() - INTERVAL 6 DAY),
  (3, 'BTC', 'buy',  1.20000000, 28000.00, 15.00, NOW() - INTERVAL 3 DAY),
  (4, 'XRP', 'buy', 500.00000000,    0.60,  1.00,  NOW() - INTERVAL 1 DAY);

-- 5. Prices
INSERT INTO `Price` (crypto_symbol, value, recorded_at) VALUES
  ('BTC', 32000.00, NOW() - INTERVAL 2 DAY),
  ('BTC', 31000.00, NOW() - INTERVAL 1 DAY),
  ('BTC', 33000.00, NOW()),
  ('ETH', 1900.00,  NOW() - INTERVAL 2 DAY),
  ('ETH', 1950.00,  NOW() - INTERVAL 1 DAY),
  ('ETH', 2000.00,  NOW()),
  ('XRP', 0.55,     NOW() - INTERVAL 2 DAY),
  ('XRP', 0.58,     NOW() - INTERVAL 1 DAY),
  ('XRP', 0.62,     NOW());

-- 6. Learn modules
INSERT INTO `Learn` (title, content, order_index) VALUES
  ('Introduction au trading crypto',      'Contenu de l’intro...', 1),
  ('Utilisation d’un portefeuille virtuel','Contenu portefeuille...', 2),
  ('Comment passer un ordre',              'Contenu passage ordre...', 3);

-- 7. Preferences
INSERT INTO `Preference` (user_id, pref_key, pref_value) VALUES
  (1, 'theme',          'dark'),
  (1, 'notifications',  'true'),
  (2, 'theme',          'light'),
  (3, 'notifications',  'false');

-- 8. User_Learn (progression)
INSERT INTO `User_Learn` (user_id, learn_id, is_completed, completed_at) VALUES
  (1, 1, TRUE,  NOW() - INTERVAL 5 DAY),
  (1, 2, TRUE,  NOW() - INTERVAL 4 DAY),
  (1, 3, FALSE, NULL),
  (2, 1, TRUE,  NOW() - INTERVAL 2 DAY),
  (3, 1, FALSE, NULL);
