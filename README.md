# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...



## chatspaceのDB設計


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user



## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|mail|string|null: false|
|password|string|null: false|
### Association
- has_many :group_users
- has_many :groups, through: :group_users
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|
|user_id|integer|null: false, foreign_key: ture|
|group_id|integer|null: false, foreign_key: true|
### Association
-belongs_to :user
-belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_id||integer|null: false, foreign_key: ture|
|user_id|integer|null: false, foreign_key: true|
### Association
has_many :group_users
has_many :users, through: :group_users
has_many :messages


-





















