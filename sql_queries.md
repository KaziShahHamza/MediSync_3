

```sql
CREATE DATABASE company_db;
```

```sql
USE medisync;
```

---

## 1. সব table দেখার জন্য

```sql
SHOW TABLES;
```

এতে দেখাবে:

```
Users
Profiles
Medicines
HealthLogs
Doctors
Prescriptions
```

---

## 2. কোন table এর structure দেখতে

Example:

```sql
DESCRIBE Users;
```

বা:

```sql
DESCRIBE Profiles;
```

এতে column, datatype, null, key দেখতে পারবে।

---

## 3. সব user দেখো

```sql
SELECT * FROM Users;
```

---

## 4. User এর সাথে profile দেখো

Foreign key relation check:

```sql
SELECT 
    Users.id,
    Users.name,
    Users.email,
    Profiles.gender,
    Profiles.bloodGroup
FROM Users
LEFT JOIN Profiles
ON Users.id = Profiles.userId;
```

---

## 5. একজন user এর medicines দেখো

ধরি user id = 1

```sql
SELECT *
FROM Medicines
WHERE userId = 1;
```

---

## 6. সব medicine এর সাথে user name দেখো

```sql
SELECT
    Users.name,
    Medicines.name AS medicine,
    Medicines.dosageTimes
FROM Medicines
JOIN Users
ON Medicines.userId = Users.id;
```

---

## 7. Health logs দেখো

```sql
SELECT *
FROM HealthLogs
ORDER BY createdAt DESC;
```

---

## 8. একজন user এর health history

```sql
SELECT
    type,
    High,
    Low,
    glucose,
    weight,
    bmi,
    createdAt
FROM HealthLogs
WHERE userId = 1
ORDER BY createdAt DESC;
```

---

## 9. Latest Blood Pressure বের করা

Dashboard যেটা করে তার মতো:

```sql
SELECT *
FROM HealthLogs
WHERE 
    userId = 1
    AND type = 'bp'
ORDER BY createdAt DESC
LIMIT 1;
```

---

## 10. একজন user এর doctor list

```sql
SELECT
    name,
    specialty,
    hospital,
    phone
FROM Doctors
WHERE userId = 1;
```

---

## 11. Dashboard summary count check

এটা dashboard service এর count এর equivalent:

```sql
SELECT
(
    SELECT COUNT(*)
    FROM Medicines
    WHERE userId = 1
) AS medicines,

(
    SELECT COUNT(*)
    FROM Doctors
    WHERE userId = 1
) AS doctors,

(
    SELECT COUNT(*)
    FROM Prescriptions
    WHERE userId = 1
) AS prescriptions;
```

Output:

```
+-----------+---------+---------------+
| medicines | doctors | prescriptions |
+-----------+---------+---------------+
| 5         | 2       | 3             |
+-----------+---------+---------------+
```

---

## 12. পুরো user health overview (dashboard style)

```sql
SELECT

u.name,

p.gender,
p.bloodGroup,

h.type,
h.High,
h.Low,
h.glucose,
h.weight,
h.bmi,
h.createdAt

FROM Users u

LEFT JOIN Profiles p
ON u.id = p.userId

LEFT JOIN HealthLogs h
ON u.id = h.userId

WHERE u.id = 1

ORDER BY h.createdAt DESC;
```

---

## Bonus: Foreign key check

Migration ঠিক হয়েছে কিনা দেখতে:

```sql
SELECT
TABLE_NAME,
COLUMN_NAME,
CONSTRAINT_NAME,
REFERENCED_TABLE_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA='medisync';
```

এখানে দেখতে পারবে:

```
Medicines.userId → Users.id
Profiles.userId → Users.id
HealthLogs.userId → Users.id
Doctors.userId → Users.id
Prescriptions.userId → Users.id
```

---

## Bonus: JSON field explore

যেহেতু MongoDB array → MySQL JSON হয়েছে:

### Medicine dosageTimes:

```sql
SELECT
name,
JSON_PRETTY(dosageTimes)
FROM Medicines;
```
