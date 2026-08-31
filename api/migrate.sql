IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260725190546_InitialCreate'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260725190546_InitialCreate', N'10.0.10');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260727172902_AddFAQs'
)
BEGIN
    CREATE TABLE [FAQ] (
        [Id] int NOT NULL IDENTITY,
        [FaqGroupId] int NOT NULL,
        [Question] nvarchar(max) NOT NULL,
        [Answer] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_FAQ] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260727172902_AddFAQs'
)
BEGIN
    CREATE TABLE [FAQGroup] (
        [Id] int NOT NULL IDENTITY,
        [Category] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_FAQGroup] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260727172902_AddFAQs'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260727172902_AddFAQs', N'10.0.10');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260728014547_AddGlossary'
)
BEGIN
    CREATE TABLE [Glossary] (
        [Id] int NOT NULL IDENTITY,
        [Term] nvarchar(max) NOT NULL,
        [Definition] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Glossary] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260728014547_AddGlossary'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260728014547_AddGlossary', N'10.0.10');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260728160850_AddParcels'
)
BEGIN
    CREATE TABLE [Parcel] (
        [Id] int NOT NULL IDENTITY,
        [Rarity] nvarchar(10) NOT NULL,
        [Odds] decimal(18,2) NOT NULL,
        [Rate] decimal(18,12) NOT NULL,
        CONSTRAINT [PK_Parcel] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260728160850_AddParcels'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260728160850_AddParcels', N'10.0.10');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260801055133_AddRegionTiers'
)
BEGIN
    CREATE TABLE [RegionTier] (
        [Id] int NOT NULL IDENTITY,
        [Key] nvarchar(120) NOT NULL,
        [Label] nvarchar(120) NOT NULL,
        [Currency] nvarchar(4) NOT NULL,
        [Derived] bit NULL,
        CONSTRAINT [PK_RegionTier] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260801055133_AddRegionTiers'
)
BEGIN
    CREATE TABLE [BoostTier] (
        [Id] int NOT NULL IDENTITY,
        [RegionTierId] int NOT NULL,
        [MinParcels] int NOT NULL,
        [ParcelsLabel] nvarchar(120) NOT NULL,
        [Boost] int NOT NULL,
        [NoAdsMonth] decimal(8,4) NOT NULL,
        [WithAdsMonth] decimal(8,4) NOT NULL,
        [WithAdsYear] decimal(8,4) NOT NULL,
        [SrbYear] decimal(8,4) NOT NULL,
        CONSTRAINT [PK_BoostTier] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_BoostTier_RegionTier_RegionTierId] FOREIGN KEY ([RegionTierId]) REFERENCES [RegionTier] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260801055133_AddRegionTiers'
)
BEGIN
    CREATE TABLE [RegionCountry] (
        [Id] int NOT NULL IDENTITY,
        [RegionTierId] int NOT NULL,
        [Code] nvarchar(20) NOT NULL,
        [Name] nvarchar(120) NOT NULL,
        CONSTRAINT [PK_RegionCountry] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_RegionCountry_RegionTier_RegionTierId] FOREIGN KEY ([RegionTierId]) REFERENCES [RegionTier] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260801055133_AddRegionTiers'
)
BEGIN
    CREATE INDEX [IX_BoostTier_RegionTierId] ON [BoostTier] ([RegionTierId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260801055133_AddRegionTiers'
)
BEGIN
    CREATE INDEX [IX_RegionCountry_RegionTierId] ON [RegionCountry] ([RegionTierId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260801055133_AddRegionTiers'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260801055133_AddRegionTiers', N'10.0.10');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260802042035_FixFAQS'
)
BEGIN
    CREATE INDEX [IX_FAQ_FaqGroupId] ON [FAQ] ([FaqGroupId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260802042035_FixFAQS'
)
BEGIN
    ALTER TABLE [FAQ] ADD CONSTRAINT [FK_FAQ_FAQGroup_FaqGroupId] FOREIGN KEY ([FaqGroupId]) REFERENCES [FAQGroup] ([Id]) ON DELETE CASCADE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260802042035_FixFAQS'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260802042035_FixFAQS', N'10.0.10');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260802043013_RemoveDerivedFromRegionTier'
)
BEGIN
    DECLARE @var nvarchar(max);
    SELECT @var = QUOTENAME([d].[name])
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[RegionTier]') AND [c].[name] = N'Derived');
    IF @var IS NOT NULL EXEC(N'ALTER TABLE [RegionTier] DROP CONSTRAINT ' + @var + ';');
    ALTER TABLE [RegionTier] DROP COLUMN [Derived];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260802043013_RemoveDerivedFromRegionTier'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260802043013_RemoveDerivedFromRegionTier', N'10.0.10');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260802043823_AddTypeToParcelOdds'
)
BEGIN
    DECLARE @var1 nvarchar(max);
    SELECT @var1 = QUOTENAME([d].[name])
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Parcel]') AND [c].[name] = N'Odds');
    IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Parcel] DROP CONSTRAINT ' + @var1 + ';');
    ALTER TABLE [Parcel] ALTER COLUMN [Odds] decimal(18,0) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260802043823_AddTypeToParcelOdds'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260802043823_AddTypeToParcelOdds', N'10.0.10');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260824041309_AddResources'
)
BEGIN
    CREATE TABLE [ResourceGroup] (
        [Id] int NOT NULL IDENTITY,
        [Category] nvarchar(max) NOT NULL,
        [Description] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_ResourceGroup] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260824041309_AddResources'
)
BEGIN
    CREATE TABLE [Resource] (
        [Id] int NOT NULL IDENTITY,
        [ResourceGroupId] int NOT NULL,
        [Name] nvarchar(max) NOT NULL,
        [Url] nvarchar(max) NOT NULL,
        [Icon] nvarchar(120) NOT NULL,
        [IconColor] nvarchar(8) NOT NULL,
        [IconBackground] nvarchar(8) NOT NULL,
        [Description] nvarchar(max) NOT NULL,
        [Badge] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Resource] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Resource_ResourceGroup_ResourceGroupId] FOREIGN KEY ([ResourceGroupId]) REFERENCES [ResourceGroup] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260824041309_AddResources'
)
BEGIN
    CREATE INDEX [IX_Resource_ResourceGroupId] ON [Resource] ([ResourceGroupId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260824041309_AddResources'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260824041309_AddResources', N'10.0.10');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260824054152_MakeResourceBadgeNullable'
)
BEGIN
    DECLARE @var2 nvarchar(max);
    SELECT @var2 = QUOTENAME([d].[name])
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Resource]') AND [c].[name] = N'Badge');
    IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [Resource] DROP CONSTRAINT ' + @var2 + ';');
    ALTER TABLE [Resource] ALTER COLUMN [Badge] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260824054152_MakeResourceBadgeNullable'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260824054152_MakeResourceBadgeNullable', N'10.0.10');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260824060747_AddBoostTiersTable'
)
BEGIN
    CREATE TABLE [BoostTier] (
        [Id] int NOT NULL IDENTITY,
        [RegionTierId] int NOT NULL,
        [MinParcels] int NOT NULL,
        [ParcelsLabel] nvarchar(120) NOT NULL,
        [Boost] int NOT NULL,
        [NoAdsMonth] decimal(8,4) NOT NULL,
        [WithAdsMonth] decimal(8,4) NOT NULL,
        [WithAdsYear] decimal(8,4) NOT NULL,
        [SrbYear] decimal(8,4) NOT NULL,
        CONSTRAINT [PK_BoostTier] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_BoostTier_RegionTier_RegionTierId] FOREIGN KEY ([RegionTierId]) REFERENCES [RegionTier] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260824060747_AddBoostTiersTable'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260824060747_AddBoostTiersTable', N'10.0.10');
END;

COMMIT;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260830022714_FixParcelOdds'
)
BEGIN
    DECLARE @var3 nvarchar(max);
    SELECT @var3 = QUOTENAME([d].[name])
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Parcel]') AND [c].[name] = N'Odds');
    IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [Parcel] DROP CONSTRAINT ' + @var3 + ';');
    ALTER TABLE [Parcel] ALTER COLUMN [Odds] decimal(18,12) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20260830022714_FixParcelOdds'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20260830022714_FixParcelOdds', N'10.0.10');
END;

COMMIT;
GO

