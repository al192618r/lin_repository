
CREATE TABLE "EDU_USER" (
"USER_ID" VARCHAR2(36 BYTE) NOT NULL ,
"LEAVE" NUMBER(2) NOT NULL ,
"USER_NAME" VARCHAR2(50 BYTE) NULL ,
"PHONE_NUMBER" VARCHAR2(20 BYTE) NULL ,
"EMAIL" VARCHAR2(100 BYTE) NULL ,
"STATUS" NUMBER(2) NULL 
)
LOGGING
NOCOMPRESS
NOCACHE

;

-- ----------------------------
-- Indexes structure for table EDU_USER
-- ----------------------------

-- ----------------------------
-- Checks structure for table EDU_USER
-- ----------------------------
ALTER TABLE "EDU_USER" ADD CHECK ("USER_ID" IS NOT NULL);
ALTER TABLE "EDU_USER" ADD CHECK ("LEAVE" IS NOT NULL);

-- ----------------------------
-- Primary Key structure for table EDU_USER
-- ----------------------------
ALTER TABLE "EDU_USER" ADD PRIMARY KEY ("USER_ID");
