
# Dictionnaire de données

## 1. User
| Attribut         | Type                   | Description                                            |
|------------------|------------------------|--------------------------------------------------------|
| id               | INT AUTO_INCREMENT     | Identifiant unique de l’utilisateur                    |
| username         | VARCHAR(100)           | Nom d’utilisateur unique                               |
| email            | VARCHAR(255)           | Adresse e-mail                                         |
| password_hash    | VARCHAR(255)           | Hash du mot de passe                                   |
| created_at       | DATETIME               | Date de création du compte                             |
| last_login       | DATETIME               | Date et heure de la dernière connexion                 |

## 2. Wallet
| Attribut         | Type                   | Description                                            |
|------------------|------------------------|--------------------------------------------------------|
| id               | INT AUTO_INCREMENT     | Identifiant unique du portefeuille                     |
| created_at       | DATETIME               | Date de création du portefeuille                       |
| balance          | DECIMAL(15,2)          | Solde (ex. 10 000 $)                                   |

## 3. Wallet_Holding
| Attribut         | Type                   | Description                                            |
|------------------|------------------------|--------------------------------------------------------|
| id               | INT AUTO_INCREMENT     | Identifiant unique de la détention                     |
| crypto_symbol    | VARCHAR(10)            | Code de la cryptomonnaie (BTC, ETH, …)                 |
| quantity         | DECIMAL(18,8)          | Quantité détenue de la cryptomonnaie                   |
| average_price    | DECIMAL(15,2)          | Prix moyen d’acquisition                               |

## 4. Trade
| Attribut         | Type                   | Description                                            |
|------------------|------------------------|--------------------------------------------------------|
| id               | INT AUTO_INCREMENT     | Identifiant unique                                     |
| crypto_symbol    | VARCHAR(10)            | Code de la cryptomonnaie (BTC, ETH, …)                 |
| type             | ENUM('achat','vente')  | Nature de l’opération (achat ou vente)                 |
| amount           | DECIMAL(18,8)          | Quantité de cryptomonnaie échangée                     |
| price            | DECIMAL(15,2)          | Prix unitaire simulé au moment de la transaction       |
| fee              | DECIMAL(15,2)          | Frais de transaction simulés                           |
| timestamp        | DATETIME               | Date et heure de l’opération                           |

## 5. Price
| Attribut         | Type                   | Description                                            |
|------------------|--------------------    |--------------------------------------------------------|
| id               | INT AUTO_INCREMENT     | Identifiant unique                                     |
| crypto_symbol    | VARCHAR(10)            | Code de la cryptomonnaie                               |
| value            | DECIMAL(15,2)          | Valeur enregistrée (historique ou simulée)             |
| recorded_at      | DATETIME               | Date et heure d’enregistrement du cours                |

## 6. Learn
| Attribut      | Type                      | Description                                            |
|---------------|---------------------------|--------------------------------------------------------|
| id            | INT AUTO_INCREMENT        | Identifiant unique du module                           |
| title         | VARCHAR(150)              | Intitulé du module pédagogique                         |
| content       | TEXT                      | Contenu pédagogique (texte, HTML ou Markdown)          |
| order_index   | INT                       | Position du module dans la séquence                    |

## 7. User_Learn
| Attribut      | Type                      | Description                                            |
|---------------|---------------------------|--------------------------------------------------------|
| id            | INT AUTO_INCREMENT        | Identifiant unique                                     |
| is_completed  | BOOLEAN                   | Indicateur si le module est complété par l’utilisateur |
| completed_at  | DATETIME                  | Date et heure de complétion (facultatif)               |

## 8. Préférence
| Attribut   | Type                         | Description                                            |
|------------|------------------------------|--------------------------------------------------------|
| id         | INT AUTO_INCREMENT           | Identifiant unique                                     |
| key        | VARCHAR(100)                 | Nom de la préférence (ex. 'theme', 'notifications')    |
| value      | VARCHAR(255)                 | Valeur associée (ex. 'dark', 'true')                   |


