/*
  Warnings:

  - You are about to drop the column `likes` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToPost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `abstract_publication_eng` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `abstract_publication_rus` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fio_author` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keywords` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lang_publication` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_publication` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `output_data` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place_work_performers` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volume_publication` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_CategoryToPost` DROP FOREIGN KEY `_CategoryToPost_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CategoryToPost` DROP FOREIGN KEY `_CategoryToPost_B_fkey`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `likes`,
    DROP COLUMN `title`,
    DROP COLUMN `views`,
    ADD COLUMN `abstract_publication_eng` VARCHAR(191) NOT NULL,
    ADD COLUMN `abstract_publication_rus` VARCHAR(191) NOT NULL,
    ADD COLUMN `attach_publication` JSON NULL,
    ADD COLUMN `fio_author` VARCHAR(191) NOT NULL,
    ADD COLUMN `keywords` VARCHAR(191) NOT NULL,
    ADD COLUMN `lang_publication` VARCHAR(191) NOT NULL,
    ADD COLUMN `name_publication` VARCHAR(191) NOT NULL,
    ADD COLUMN `output_data` VARCHAR(191) NOT NULL,
    ADD COLUMN `place_work_performers` VARCHAR(191) NOT NULL,
    ADD COLUMN `volume_publication` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Category`;

-- DropTable
DROP TABLE `_CategoryToPost`;

-- CreateTable
CREATE TABLE `Type_Publication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Type_Publication_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PostToType_Publication` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PostToType_Publication_AB_unique`(`A`, `B`),
    INDEX `_PostToType_Publication_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PostToType_Publication` ADD CONSTRAINT `_PostToType_Publication_A_fkey` FOREIGN KEY (`A`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PostToType_Publication` ADD CONSTRAINT `_PostToType_Publication_B_fkey` FOREIGN KEY (`B`) REFERENCES `Type_Publication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
