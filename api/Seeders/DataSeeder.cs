using api.Contexts;
using api.Models;

namespace api.Seeders;

public class DataSeeder(IServiceScopeFactory serviceScopeFactory)
{
    public void SeedData()
    {
        using (var scope = serviceScopeFactory.CreateScope())
        {
            var context = scope.ServiceProvider.GetService<SqlServerContext>();
            SeedFAQs(context);
            SeedGlossary(context);
            SeedParcels(context);
            SeedRegionTiers(context);
            SeedResources(context);
        }
    }

    private void SeedFAQs(SqlServerContext context)
    {
        var oFaqGroups = new List<FAQGroup>()
        {
            new()
            {
                Category = "Getting Started",
                Questions = new List<FAQ>
                {
                    new()
                    {
                        Question = "What is Atlas Earth?",
                        Answer =
                            "Atlas Earth is a mobile game where you buy virtual plots of real-world land (parcels) mapped to the l globe. Each parcel you own generates virtual rent every second, which can eventually be cashed out for real money."
                    },
                    new()
                    {
                        Question = "Is Atlas Earth free to play?",
                        Answer =
                            "Yes, 100%. While you can spend real money to buy in-game currency, you can play entirely for free by collecting diamonds on the map, spinning the daily wheel, and watching ads for free Atlas Bucks."
                    },
                    new()
                    {
                        Question = "How do I download Atlas Earth?",
                        Answer =
                            "Atlas Earth is available on both the Apple App Store for iOS devices and the Google Play Store for Android devices."
                    },
                    new()
                    {
                        Question = "What is a parcel?",
                        Answer =
                            "A parcel is a 30ft x 30ft square of virtual land that corresponds to a real-world location. When you buy a parcel, you own that specific piece of the Atlas Earth map."
                    },
                    new()
                    {
                        Question = "What are Atlas Bucks?",
                        Answer =
                            "Atlas Bucks (AB) are the primary in-game currency used to purchase parcels of land and badges. 100 AB buys 1 parcel of land."
                    },
                    new()
                    {
                        Question = "How do I earn Atlas Bucks?",
                        Answer = @"
                                    You can earn AB by:
                                    <ul>
                                        <li>Watching an ad every 20 minutes (for 2 AB)</li>
                                        <li>Spinning the diamond wheel</li>
                                        <li>Connecting a credit card for merchant rewards</li>
                                        <li>Converting your earned rent</li>
                                        <li>Buying AB packs either in the In-Game Shop or Web App</li>
                                    </ul>
                                "
                    }
                }
            },
            new()
            {
                Category = "Buying &amp; Owning Land",
                Questions = new List<FAQ>
                {
                    new()
                    {
                        Question = "How do I buy a parcel?",
                        Answer =
                            "Open the app, go to the map screen, tap 'Buy Land', and select any available green square around your current physical location. You must be physically near a parcel to buy it."
                    },
                    new()
                    {
                        Question = "What does it cost to buy a parcel?",
                        Answer = "Every parcel costs exactly 100 Atlas Bucks, regardless of its location or rarity."
                    },
                    new()
                    {
                        Question = "Can I buy parcels anywhere in the world?",
                        Answer =
                            "You can only buy parcels within your immediate physical vicinity. You have to travel to a location to buy land there."
                    },
                    new()
                    {
                        Question = "What happens if someone already owns a parcel I want?",
                        Answer =
                            "If a parcel is red on the map, it is owned by someone else. You cannot buy it unless they explicitly list it for sale."
                    },
                    new()
                    {
                        Question = "How many parcels can I own?",
                        Answer =
                            "There is no limit to how many parcels you can own, though your rent boost multiplier will decrease as you hit certain parcel count milestones."
                    },
                    new()
                    {
                        Question = "Can I sell my parcels?",
                        Answer =
                            "Unfortunately, due to excessive player abuse, the parcel sale feature was rolled back on September 2025."
                    }
                }
            },
            new()
            {
                Category = "Earnings &amp; Payouts",
                Questions = new List<FAQ>
                {
                    new()
                    {
                        Question = "How much can I realistically earn?",
                        Answer =
                            "Earnings are slow. A free-to-play player who stays boosted consistently might make $150-$200 in their first year. It is not a way to get rich or replace a job; treat it as a game that occasionally buys you a coffee."
                    },
                    new()
                    {
                        Question = "How do payouts work?",
                        Answer =
                            "Once you reach the minimum threshold, you can cash out your accrued virtual rent via PayPal, various gift cards, or bank transfer (depending on your region)."
                    },
                    new()
                    {
                        Question = "What is the minimum payout threshold?",
                        Answer = "The minimum amount you can cash out is $5.00 USD."
                    },
                    new()
                    {
                        Question = "How long does it take to get a payout?",
                        Answer =
                            "Most payouts are processed almost instantly, though bank transfers or PayPal can sometimes take up to 48 hours to clear."
                    },
                    new()
                    {
                        Question = "Are earnings taxable?",
                        Answer =
                            "If you cash out more than $2,000 USD in a calendar year, Atlas Reality requires you to fill out a W-9 tax form (in the US). Consult a tax professional regarding your specific situation."
                    }
                }
            },
            new()
            {
                Category = "Game Mechanics",
                Questions = new List<FAQ>
                {
                    new()
                    {
                        Question = "Atlas Bucks vs Virtual Rent",
                        Answer =
                            "Atlas Bucks (AB) are used to buy land and badges. Virtual Rent is the currency representing your accrued rent (the micro-fractions of a cent generated by your land) which converts directly to real USD."
                    },
                    new()
                    {
                        Question = "Is there a referral program?",
                        Answer =
                            "Atlas Reality sunset their referral program at the end of January 2026. It is no longer active. There is no longer a way to earn passive income by referring other players."
                    },
                    new()
                    {
                        Question = "What are badges and how do I earn them?",
                        Answer =
                            "Badges are collectibles for specific cities, states, and countries. Buying a badge costs 200 AB and provides a permanent percentage boost to your overall rent generation across all your parcels."
                    },
                    new()
                    {
                        Question = "What is rent and how is it calculated?",
                        Answer = @"
                                    Rent is generated every second based on the rarities of your parcels:
                                    <ul>
                                        <li>Common = $1.1&times;10<sup>-9</sup>/sec.</li>
                                        <li>Rare = $1.6&times;10<sup>-9</sup>/sec.</li>
                                        <li>Epic = $2.2&times;10<sup>-9</sup>/sec.</li>
                                        <li>Legendary = $4.4&times;10<sup>-9</sup>/sec.</li>
                                        <li>This is multiplied by your ad boost and badge boosts.</li>
                                    </ul>
                                 "
                    },
                    new()
                    {
                        Question = "Do parcels in cities earn more than rural parcels?",
                        Answer =
                            "No. The location of a parcel has absolutely no effect on its rarity or rent generation. A parcel in Times Square has the exact same odds of being Legendary as a parcel in an empty field."
                    },
                    new()
                    {
                        Question = "What are Atlas Landmarks?",
                        Answer =
                            "Landmarks are special, recognizable real-world locations (like the Statue of Liberty) made up of <strong>x</strong> amount of <strong>Common Parcels</strong>. They cannot be purchased like standard parcels. Instead, Landmark bids will run as Events, and every Landmark will start at <strong>100 ABs</strong>. Players must bid using <strong>Bid Tokens</strong>. Every bid will increase the price by 1AB, and in the end, the player who puts the final bid token wins the opportunity to buy the Landmark for the final bid price. Players must submit a minimum of 1 bid token within the first 24 hours of the event to be allowed to participate in Phase 2 of the bid. So far, there have been 2 Beta Landmark Events: Canada featured <strong>Peggy's Cove Lighthouse</strong> in <strong>Nova Scotia</strong>, and the US featured <strong>Jackson Square</strong> in <strong>New Orleans</strong>. Landmark owners will earn <strong>10 ABs</strong> from Landmark badge sales"
                    },
                    new()
                    {
                        Question = "Can I buy Bid Tokens?",
                        Answer =
                            "At this time, Bid Tokens cannot be purchased. As you may know, the Diamond Wheel and Monthly Challenges had a recent update in May 2026 to replace Diamond rewards with Bid Tokens. Artorias2718 reached out to support and asked them if they would consider allowing players to purchase one Bid Token per day from the Game and/or Web App Shops. and even to the paid Explorers Club Daily Login on Bonus Days, where the current Bonus Day ABs would be totaled up on the left column, and the right column would display x amount of Bid Tokens. While Atlas Support told him these sound like great ideas, they did not confirm whether or not they would implement them."
                    }
                }
            },
            new()
            {
                Category = "Tips &amp; Strategy",
                Questions = new List<FAQ>
                {
                    new()
                    {
                        Question = "What's the best strategy for new players?",
                        Answer = @"
                                    <ul>
                                        <li>Once you have your first parcel,
                                        the meat of the game involves watching ads to keep your rent boosted 24/7.</li>
                                        <li>Watch the ad for 2 AB every 20 minutes as often as possible.</li> <li>I highly suggest you
                                        get your first five badges ASAP.</li>
                                            <li>
                                                <ul>
                                                    <li>Most players advise you don't buy a badge until you have at least 40 parcels</li>
                                                    <li>The cheapest way to achieve this is to earn 600 ABs as soon as possible through F2P methods:
                                                    <ul>
                                                        <li>Watching ads for 1/2 Free ABs and Rent Boost</li>
                                                        <li>Convert accrued rent to ABs</li>
                                                        <li>Complete challenge missions</li>
                                                        <li>etc.</li>
                                                    </ul>
                                            </li>
                                        </li>
                                        <li>
                                            I highly recommend this in case you can easily afford $50/mo.USD for the Explorers Club or you'd like to try it
                                        </li>
                                        <li>
                                            At least consider paying $10/mo.for a Challenges Pass to unlock Premium Rewards from Monthly Challenges
                                        </li>
                                    </ul>
                                "
                    },
                    new()
                    {
                        Question = "Should I focus on buying lots of cheap parcels or fewer premium ones?",
                        Answer =
                            "You don't get to choose parcel rarity—it's randomly generated when you buy it. The strategy is simply to buy as many parcels as possible and let the odds (50% Common, 30% Rare, 15% Epic, 5% Legendary) play out."
                    },
                    new()
                    {
                        Question = "How do I find the best parcels to buy?",
                        Answer =
                            "Because rarity is entirely random and determined at the moment of purchase, there is no way to 'find' better parcels. It's pure luck."
                    },
                    new()
                    {
                        Question = "Is it worth using real money to buy Atlas Bucks?",
                        Answer =
                            "Generally, no. The Return on Investment (ROI) for buying AB with real money takes years. The best way to play is free-to-play, or by signing up for the Explorer Club if you are a dedicated player."
                    },
                    new()
                    {
                        Question = "What are the most common mistakes new players make?",
                        Answer = @"
                                    <ol>
                                        <li>Buying badges too early (before 40 parcels).</li>
                                        <li>Forgetting to keep their ad boost active.</li>
                                        <li>Crossing a tier threshold (e.g.,
                                        buying parcel #151) which drops their boost multiplier without having enough parcels saved up to
                                        jump deep into the next tier.</li>
                                    </ol>
                                "
                    }
                }
            },
            new()
            {
                Category = "Community &amp; Other",
                Questions = new List<FAQ>
                {
                    new()
                    {
                        Question = "Where can I find the Atlas Earth community?",
                        Answer =
                            "The most active community is on Reddit at r/AtlasEarthOfficial. There are also several large Facebook groups dedicated to players sharing strategies."
                    },
                    new()
                    {
                        Question = "Are there any Discord channels?",
                        Answer = @"
                                    <ul>
                                        <li>
                                            <a href='https://discord.gg/H2qHxrf8m'>Join the Official Atlas Earth Server</a>
                                        </li>
                                        <li>
                                            <a href='https://discord.gg/GMNtj8aDr'>Join the Atlas Earth Community</a>
                                        </li>
                                    </ul>
                                "
                    },
                    new()
                    {
                        Question = "How do I report a bug or contact support?",
                        Answer =
                            "You can contact support directly through the settings menu in the app, or via the Atlas Reality website's help center."
                    },
                    new()
                    {
                        Question = "Is Atlas Earth a scam?",
                        Answer =
                            "No. It is a legitimate game that actually pays out. However, you should not view it as an investment or a source of income. It is an ad-revenue sharing app gamified as virtual real estate."
                    },
                    new()
                    {
                        Question = "Can I play Atlas Earth on a desktop/PC?",
                        Answer =
                            @"
                                Atlas Earth is a mobile-only application that relies on GPS data. Unfortunately, allowing Emulation and VPN Connections would give all players ways to easily circumvent GPS Spoofing Detection and Bots to automate player actions, so Atlas Reality integrated an AI-Powered Plugin to help monitor player activity for:
                                <ul>
                                    <li>GPS Spoofing</li>
                                    <li>Emulation</li>
                                    <li>VPN Connections</li>
                                    <li>Automated Scripting</li>
                                </ul>
                            "
                    }
                }
            }
        };

        if (!context.FAQGroups.Any())
        {
            var oFaqs = oFaqGroups.SelectMany(x => x.Questions);
            context.FAQGroups.AddRange(oFaqGroups);
            context.SaveChanges();

            foreach (var oFaqGroup in oFaqGroups)
            {
                var nFaqGroupId = oFaqGroup.Id;
                var oParallelFaqs = oFaqGroup.Questions.AsParallel();
                oParallelFaqs.ForAll(x =>
                {
                    x.FaqGroupId = nFaqGroupId;
                    x.Answer = x.Answer.Trim();
                });
            }

            context.FAQs.AddRange(oFaqs);
            context.SaveChanges();
        }
    }

    private void SeedGlossary(SqlServerContext context)
    {
        var oGlossary = new List<Glossary>
        {
            new()
            {
                Term = "AB (Atlas Bucks)",
                Definition =
                    "The primary in-game currency used to buy parcels of land and badges. Can be bought with real money or earned for free."
            },
            new()
            {
                Term = "Ad Boost",
                Definition =
                    "A multiplier applied to your rent generation. By watching an ad, you boost your rent by a multiplier (up to 30x) for 1 hour. You can stack up to 6 hours at a time."
            },
            new()
            {
                Term = "Badge",
                Definition =
                    "A collectible representing a city, state, or country. Costing 200 AB, they provide permanent percentage-based boosts (5%, 10%, 15%, etc.) to your total rent."
            },
            new()
            {
                Term = "Bid Token",
                Definition =
                    "A consumable item used to participate in Landmark Auction Events. Currently cannot be purchased; it has replaced the Diamond Rewards on the Diamond Wheel and Challenges"
            },
            new()
            {
                Term = "CP (Challenges Pass)",
                Definition =
                    "A monthly subscription service ($10 USD/mo. $100 USD/yr.), similar to EC. Used to unlock the premium rewards ladder. The monthly subscription is $10 USD/mo; however, if purchased in the middle of the current month, players may pay a one-time $15 fee if they wish to collect all of the current month's Premium Rewards up to their current Free Reward Slot"
            },
            new()
            {
                Term = "Diamonds",
                Definition =
                    "Collectibles found on the map by physically walking near them. Used exclusively to spin the Diamond Wheel for prizes."
            },
            new()
            {
                Term = "Diamond Wheel",
                Definition =
                    "A daily roulette wheel where you spend diamonds for a chance to win Atlas Bucks. F2P players get three free spins, while EC players get five free spins per day. Once free spins are exhausted, you can get two more spins by watching an ad."
            },
            new()
            {
                Term = "EC (Explorers Club)",
                Definition =
                    "A monthly subscription service ($50/month) that provides a large amount of Atlas Bucks daily just for logging in. Requires you to own 5 badges to join."
            },
            new()
            {
                Term = "Landmark",
                Definition =
                    "Special visual representations of famous real-world locations on the map. So far, Canada and the US have respectively had one Beta Landmark Event"
            },
            new()
            {
                Term = "Mayor/Governor/President",
                Definition =
                    "Titles granted to the player who owns the most parcels in a specific city/town/county (Mayor), state/province/region (Governor, Premier, etc.), or country (President, Prime Minister, Chancellor, etc.). Title holders get a small cut of AB when players buy badges in their territory."
            },
            new()
            {
                Term = "Parcel",
                Definition = "A 30x30 foot plot of virtual land. Costs 100 AB. Generates rent."
            },
            new()
            {
                Term = "Rarity",
                Definition =
                    "Parcels come in 4 tiers: Common (50% chance), Rare (30%), Epic (15%), and Legendary (5%). Higher rarities generate more rent per second."
            },
            new()
            {
                Term = "Rent",
                Definition =
                    "The actual USD value generated by your parcels. Shown as micro-fractions of a cent that accrue constantly."
            },
            new()
            {
                Term = "SRB (Super Rent Boost)",
                Definition =
                    "A special event hosted by Atlas Reality (usually twice a month) where ALL players, regardless of how many parcels they own, get a 50x multiplier on their rent for 32 hours."
            },
            new()
            {
                Term = "Tier/Tier Drop",
                Definition =
                    "As you buy more parcels, your ad boost multiplier decreases to balance the economy (e.g., dropping from 30x to 20x at 151 parcels). The point where this drops is a 'tier'."
            }
        };

        if (!context.Glossaries.Any())
        {
            context.Glossaries.AddRange(oGlossary);
            context.SaveChanges();
        }
    }

    private void SeedParcels(SqlServerContext context)
    {
        var oParcels = new List<Parcel>
        {
            new()
            {
                Rarity = "Common",
                Odds = 0.5M,
                Rate = 0.0000000011M
            },
            new()
            {
                Rarity = "Rare",
                Odds = 0.3M,
                Rate = 0.0000000016M
            },
            new()
            {
                Rarity = "Epic",
                Odds = 0.15M,
                Rate = 0.0000000022M
            },
            new()
            {
                Rarity = "Legendary",
                Odds = 0.05M,
                Rate = 0.0000000044M
            }
        };

        if (!context.Parcels.Any())
        {
            context.Parcels.AddRange(oParcels);
            context.SaveChanges();
        }
    }

    private void SeedRegionTiers(SqlServerContext context)
    {
        var oRegionCountries = new Dictionary<string, List<RegionCountry>>();
        var oBoostTiers = new Dictionary<string, List<BoostTier>>();

        // -------------- COUNTRIES ------------------------
        oRegionCountries.Add("USA",
            new List<RegionCountry>
            {
                new()
                {
                    Code = "US",
                    Name = "United States"
                }
            });

        oRegionCountries.Add("CMW",
            new List<RegionCountry>
            {
                new()
                {
                    Code = "AU",
                    Name = "Australia"
                },
                new()
                {
                    Code = "CA",
                    Name = "Canada"
                },
                new()
                {
                    Code = "ZA",
                    Name = "South Africa"
                },
                new()
                {
                    Code = "IE",
                    Name = "Ireland"
                },
                new()
                {
                    Code = "NZ",
                    Name = "New Zealand"
                },
                new()
                {
                    Code = "GB",
                    Name = "United Kingdom"
                }
            });

        oRegionCountries.Add("MEX",
            new List<RegionCountry>
            {
                new()
                {
                    Code = "MX",
                    Name = "Mexico"
                }
            });

        oRegionCountries.Add("EUR",
            new List<RegionCountry>
            {
                new()
                {
                    Code = "DE",
                    Name = "Germany"
                },
                new()
                {
                    Code = "FR",
                    Name = "France"
                },
                new()
                {
                    Code = "NL",
                    Name = "Netherlands"
                },
                new()
                {
                    Code = "ES",
                    Name = "Spain"
                },
                new()
                {
                    Code = "IT",
                    Name = "Italy"
                },
                new()
                {
                    Code = "PT",
                    Name = "Portugal"
                }
            });

        oRegionCountries.Add("AME",
            new List<RegionCountry>
            {
                new()
                {
                    Code = "KR",
                    Name = "South Korea"
                },
                new()
                {
                    Code = "JP",
                    Name = "Japan"
                },
                new()
                {
                    Code = "SG",
                    Name = "Singapore"
                },
                new()
                {
                    Code = "AE",
                    Name = "United Arab Emirates"
                },
                new()
                {
                    Code = "CH",
                    Name = "Switzerland"
                },
            });

        oRegionCountries.Add("BRZ",
            new List<RegionCountry>
            {
                new()
                {
                    Code = "BR",
                    Name = "Brazil"
                },
            }
        );

        oRegionCountries.Add("NOR",
            new List<RegionCountry>
            {
                new()
                {
                    Code = "SE",
                    Name = "Sweden"
                },
                new()
                {
                    Code = "FI",
                    Name = "Finland"
                },
                new()
                {
                    Code = "AT",
                    Name = "Austria"
                },
                new()
                {
                    Code = "TW",
                    Name = "Taiwan"
                },
                new()
                {
                    Code = "NO",
                    Name = "Norway"
                },
                new()
                {
                    Code = "DK",
                    Name = "Denmark"
                },
                new()
                {
                    Code = "BE",
                    Name = "Belgium"
                },
            });

        oRegionCountries.Add("THSKPLPH",
            new List<RegionCountry>
            {
                new()
                {
                    Code = "TH",
                    Name = "Thailand"
                },
                new()
                {
                    Code = "SK",
                    Name = "Slovakia"
                },
                new()
                {
                    Code = "PL",
                    Name = "Poland"
                },
                new()
                {
                    Code = "PH",
                    Name = "Philippines"
                },
            });

        // -------------- BOOST TIERS ------------------------
        oBoostTiers.Add(
            "USA",
            new List<BoostTier>
            {
                new()
                {
                    ParcelsLabel = "1-150",
                    Boost = 30,
                    NoAdsMonth = 0.6266M,
                    WithAdsMonth = 15.77M,
                    WithAdsYear = 189.23M,
                    SrbYear = 221.99M
                },
                new()
                {
                    ParcelsLabel = "151-220",
                    Boost = 20,
                    NoAdsMonth = 0.9190M,
                    WithAdsMonth = 15.47M,
                    WithAdsYear = 185.64M,
                    SrbYear = 233.69M
                },
                new()
                {
                    ParcelsLabel = "221-290",
                    Boost = 15,
                    NoAdsMonth = 1.2114M,
                    WithAdsMonth = 15.34M,
                    WithAdsYear = 184.13M,
                    SrbYear = 247.48M
                },
                new()
                {
                    ParcelsLabel = "291-365",
                    Boost = 12,
                    NoAdsMonth = 1.5247M,
                    WithAdsMonth = 15.50M,
                    WithAdsYear = 186.01M,
                    SrbYear = 265.74M
                },
                new()
                {
                    ParcelsLabel = "366-435",
                    Boost = 10,
                    NoAdsMonth = 1.8171M,
                    WithAdsMonth = 15.45M,
                    WithAdsYear = 185.35M,
                    SrbYear = 280.36M
                },
                new()
                {
                    ParcelsLabel = "436-545",
                    Boost = 8,
                    NoAdsMonth = 2.2766M,
                    WithAdsMonth = 15.56M,
                    WithAdsYear = 186.68M,
                    SrbYear = 305.72M
                },
                new()
                {
                    ParcelsLabel = "546-625",
                    Boost = 7,
                    NoAdsMonth = 2.6108M,
                    WithAdsMonth = 15.66M,
                    WithAdsYear = 187.98M,
                    SrbYear = 324.49M
                },
                new()
                {
                    ParcelsLabel = "626-730",
                    Boost = 6,
                    NoAdsMonth = 3.0494M,
                    WithAdsMonth = 15.76M,
                    WithAdsYear = 189.06M,
                    SrbYear = 348.51M
                },
                new()
                {
                    ParcelsLabel = "731-875",
                    Boost = 5,
                    NoAdsMonth = 3.6551M,
                    WithAdsMonth = 15.84M,
                    WithAdsYear = 190.07M,
                    SrbYear = 381.18M
                },
                new()
                {
                    ParcelsLabel = "876-1100",
                    Boost = 4,
                    NoAdsMonth = 4.595M,
                    WithAdsMonth = 16.08M,
                    WithAdsYear = 192.99M,
                    SrbYear = 433.25M
                },
                new()
                {
                    ParcelsLabel = "1101-1500",
                    Boost = 3,
                    NoAdsMonth = 6.266M,
                    WithAdsMonth = 16.65M,
                    WithAdsYear = 199.84M,
                    SrbYear = 527.47M
                },
                new()
                {
                    ParcelsLabel = "1501-3000",
                    Boost = 2,
                    NoAdsMonth = 12.53M,
                    WithAdsMonth = 22.97M,
                    WithAdsYear = 275.70M,
                    SrbYear = 930.96M
                },
                new()
                {
                    ParcelsLabel = "6000",
                    Boost = 2,
                    NoAdsMonth = 25.06M,
                    WithAdsMonth = 45.95M,
                    WithAdsYear = 551.40M,
                    SrbYear = 1861.91M
                },
                new()
                {
                    ParcelsLabel = "10,000",
                    Boost = 2,
                    NoAdsMonth = 41.77M,
                    WithAdsMonth = 76.58M,
                    WithAdsYear = 919.00M,
                    SrbYear = 3103.19M
                },
            });

        oBoostTiers.Add(
            "CMW",
            new List<BoostTier>
            {
                new()
                {
                    ParcelsLabel = "1-60",
                    Boost = 20,
                    NoAdsMonth = 0.2506M,
                    WithAdsMonth = 4.22M,
                    WithAdsYear = 50.63M,
                    SrbYear = 63.73M
                },
                new()
                {
                    ParcelsLabel = "61-100",
                    Boost = 15,
                    NoAdsMonth = 0.4177M,
                    WithAdsMonth = 5.29M,
                    WithAdsYear = 63.49M,
                    SrbYear = 85.34M
                },
                new()
                {
                    ParcelsLabel = "101-150",
                    Boost = 10,
                    NoAdsMonth = 0.6266M,
                    WithAdsMonth = 5.33M,
                    WithAdsYear = 63.91M,
                    SrbYear = 96.68M
                },
                new()
                {
                    ParcelsLabel = "151-180",
                    Boost = 8,
                    NoAdsMonth = 0.752M,
                    WithAdsMonth = 5.14M,
                    WithAdsYear = 61.66M,
                    SrbYear = 100.97M
                },
                new()
                {
                    ParcelsLabel = "181-220",
                    Boost = 7,
                    NoAdsMonth = 0.919M,
                    WithAdsMonth = 5.51M,
                    WithAdsYear = 66.17M,
                    SrbYear = 114.22M
                },
                new()
                {
                    ParcelsLabel = "221-250",
                    Boost = 6,
                    NoAdsMonth = 1.044M,
                    WithAdsMonth = 5.40M,
                    WithAdsYear = 64.75M,
                    SrbYear = 119.35M
                },
                new()
                {
                    ParcelsLabel = "251-300",
                    Boost = 5,
                    NoAdsMonth = 1.25M,
                    WithAdsMonth = 5.43M,
                    WithAdsYear = 65.17M,
                    SrbYear = 130.69M
                },
                new()
                {
                    ParcelsLabel = "301-350",
                    Boost = 4,
                    NoAdsMonth = 1.46M,
                    WithAdsMonth = 5.12M,
                    WithAdsYear = 61.41M,
                    SrbYear = 137.85M
                },
                new()
                {
                    ParcelsLabel = "351-450",
                    Boost = 3,
                    NoAdsMonth = 1.88M,
                    WithAdsMonth = 5.013M,
                    WithAdsYear = 60.15M,
                    SrbYear = 158.44M
                },
                new()
                {
                    ParcelsLabel = "451-3000",
                    Boost = 2,
                    NoAdsMonth = 12.53M,
                    WithAdsMonth = 22.97M,
                    WithAdsYear = 275.70M,
                    SrbYear = 930.96M
                },
                new()
                {
                    ParcelsLabel = "6000",
                    Boost = 2,
                    NoAdsMonth = 25.06M,
                    WithAdsMonth = 45.95M,
                    WithAdsYear = 551.40M,
                    SrbYear = 1861.91M
                },
                new()
                {
                    ParcelsLabel = "10000",
                    Boost = 2,
                    NoAdsMonth = 41.77M,
                    WithAdsMonth = 76.58M,
                    WithAdsYear = 919.00M,
                    SrbYear = 3103.19M
                },
            }
        );

        oBoostTiers.Add("MEX",
            new List<BoostTier>
            {
                new()
                {
                    ParcelsLabel = "1-50",
                    Boost = 20,
                    NoAdsMonth = 0.2089M,
                    WithAdsMonth = 3.52M,
                    WithAdsYear = 42.19M,
                    SrbYear = 53.11M
                },
                new()
                {
                    ParcelsLabel = "51-85",
                    Boost = 15,
                    NoAdsMonth = 0.3551M,
                    WithAdsMonth = 4.50M,
                    WithAdsYear = 53.97M,
                    SrbYear = 72.54M
                },
                new()
                {
                    ParcelsLabel = "86-100",
                    Boost = 12,
                    NoAdsMonth = 0.4177M,
                    WithAdsMonth = 4.25M,
                    WithAdsYear = 50.96M,
                    SrbYear = 72.80M
                },
                new()
                {
                    ParcelsLabel = "101-140",
                    Boost = 8,
                    NoAdsMonth = 0.585M,
                    WithAdsMonth = 4.00M,
                    WithAdsYear = 47.96M,
                    SrbYear = 78.53M
                },
                new()
                {
                    ParcelsLabel = "141-175",
                    Boost = 7,
                    NoAdsMonth = 0.731M,
                    WithAdsMonth = 4.39M,
                    WithAdsYear = 52.63M,
                    SrbYear = 89.76M
                },
                new()
                {
                    ParcelsLabel = "176-225",
                    Boost = 5,
                    NoAdsMonth = 0.940M,
                    WithAdsMonth = 4.07M,
                    WithAdsYear = 48.87M,
                    SrbYear = 98.02M
                },
                new()
                {
                    ParcelsLabel = "226-300",
                    Boost = 4,
                    NoAdsMonth = 1.25M,
                    WithAdsMonth = 4.39M,
                    WithAdsYear = 52.63M,
                    SrbYear = 118.16M
                },
                new()
                {
                    ParcelsLabel = "301-400",
                    Boost = 3,
                    NoAdsMonth = 1.67M,
                    WithAdsMonth = 4.46M,
                    WithAdsYear = 53.47M,
                    SrbYear = 140.84M
                },
                new()
                {
                    ParcelsLabel = "401-1000",
                    Boost = 2,
                    NoAdsMonth = 4.18M,
                    WithAdsMonth = 7.66M,
                    WithAdsYear = 91.90M,
                    SrbYear = 310.32M
                },
                new()
                {
                    ParcelsLabel = "3,000",
                    Boost = 2,
                    NoAdsMonth = 12.53M,
                    WithAdsMonth = 22.97M,
                    WithAdsYear = 275.70M,
                    SrbYear = 930.96M
                },
                new()
                {
                    ParcelsLabel = "6000",
                    Boost = 2,
                    NoAdsMonth = 25.06M,
                    WithAdsMonth = 45.95M,
                    WithAdsYear = 551.40M,
                    SrbYear = 1861.91M
                },
                new()
                {
                    ParcelsLabel = "10000",
                    Boost = 2,
                    NoAdsMonth = 41.77M,
                    WithAdsMonth = 76.58M,
                    WithAdsYear = 919.00M,
                    SrbYear = 3103.19M
                },
            });

        oBoostTiers.Add("EUR",
            new List<BoostTier>
            {
                new()
                {
                    ParcelsLabel = "1-70",
                    Boost = 20,
                    NoAdsMonth = 0.2924M,
                    WithAdsMonth = 4.92M,
                    WithAdsYear = 59.07M,
                    SrbYear = 74.36M
                },
                new()
                {
                    ParcelsLabel = "71-100",
                    Boost = 15,
                    NoAdsMonth = 0.4177M,
                    WithAdsMonth = 5.29M,
                    WithAdsYear = 63.49M,
                    SrbYear = 85.34M
                },
                new()
                {
                    ParcelsLabel = "101-135",
                    Boost = 10,
                    NoAdsMonth = 0.5639M,
                    WithAdsMonth = 4.79M,
                    WithAdsYear = 57.52M,
                    SrbYear = 87.01M
                },
                new()
                {
                    ParcelsLabel = "136-170",
                    Boost = 8,
                    NoAdsMonth = 0.7101M,
                    WithAdsMonth = 4.85M,
                    WithAdsYear = 58.23M,
                    SrbYear = 95.36M
                },
                new()
                {
                    ParcelsLabel = "171-200",
                    Boost = 7,
                    NoAdsMonth = 0.8355M,
                    WithAdsMonth = 5.01M,
                    WithAdsYear = 60.15M,
                    SrbYear = 103.84M
                },
                new()
                {
                    ParcelsLabel = "201-250",
                    Boost = 6,
                    NoAdsMonth = 1.04M,
                    WithAdsMonth = 5.40M,
                    WithAdsYear = 64.75M,
                    SrbYear = 119.35M
                },
                new()
                {
                    ParcelsLabel = "251-300",
                    Boost = 5,
                    NoAdsMonth = 1.25M,
                    WithAdsMonth = 5.43M,
                    WithAdsYear = 65.17M,
                    SrbYear = 130.69M
                },
                new()
                {
                    ParcelsLabel = "301-350",
                    Boost = 4,
                    NoAdsMonth = 1.46M,
                    WithAdsMonth = 5.12M,
                    WithAdsYear = 61.41M,
                    SrbYear = 137.85M
                },
                new()
                {
                    ParcelsLabel = "351-400",
                    Boost = 3,
                    NoAdsMonth = 1.67M,
                    WithAdsMonth = 4.46M,
                    WithAdsYear = 53.47M,
                    SrbYear = 140.84M
                },
                new()
                {
                    ParcelsLabel = "401-1000",
                    Boost = 2,
                    NoAdsMonth = 4.18M,
                    WithAdsMonth = 7.66M,
                    WithAdsYear = 91.90M,
                    SrbYear = 310.32M
                },
                new()
                {
                    ParcelsLabel = "3000",
                    Boost = 2,
                    NoAdsMonth = 12.53M,
                    WithAdsMonth = 22.97M,
                    WithAdsYear = 275.70M,
                    SrbYear = 930.96M
                },
                new()
                {
                    ParcelsLabel = "6000",
                    Boost = 2,
                    NoAdsMonth = 25.06M,
                    WithAdsMonth = 45.95M,
                    WithAdsYear = 551.40M,
                    SrbYear = 1861.91M
                },
                new()
                {
                    ParcelsLabel = "10000",
                    Boost = 2,
                    NoAdsMonth = 41.77M,
                    WithAdsMonth = 76.58M,
                    WithAdsYear = 919.00M,
                    SrbYear = 3103.19M
                },
            });

        oBoostTiers.Add("AME",
            new List<BoostTier>
            {
                new()
                {
                    ParcelsLabel = "1-50",
                    Boost = 20,
                    NoAdsMonth = 0.2089M,
                    WithAdsMonth = 3.52M,
                    WithAdsYear = 42.19M,
                    SrbYear = 53.11M
                },
                new()
                {
                    ParcelsLabel = "51-70",
                    Boost = 15,
                    NoAdsMonth = 0.2924M,
                    WithAdsMonth = 3.70M,
                    WithAdsYear = 44.43M,
                    SrbYear = 59.74M
                },
                new()
                {
                    ParcelsLabel = "71-105",
                    Boost = 12,
                    NoAdsMonth = 0.4386M,
                    WithAdsMonth = 3.73M,
                    WithAdsYear = 44.74M,
                    SrbYear = 67.67M
                },
                new()
                {
                    ParcelsLabel = "106-130",
                    Boost = 8,
                    NoAdsMonth = 0.5430M,
                    WithAdsMonth = 3.71M,
                    WithAdsYear = 44.53M,
                    SrbYear = 72.92M
                },
                new()
                {
                    ParcelsLabel = "131-150",
                    Boost = 7,
                    NoAdsMonth = 0.6266M,
                    WithAdsMonth = 3.76M,
                    WithAdsYear = 45.11M,
                    SrbYear = 77.88M
                },
                new()
                {
                    ParcelsLabel = "151-175",
                    Boost = 6,
                    NoAdsMonth = 0.7310M,
                    WithAdsMonth = 3.78M,
                    WithAdsYear = 45.32M,
                    SrbYear = 83.55M
                },
                new()
                {
                    ParcelsLabel = "176-200",
                    Boost = 5,
                    NoAdsMonth = 0.8355M,
                    WithAdsMonth = 3.62M,
                    WithAdsYear = 43.44M,
                    SrbYear = 87.13M
                },
                new()
                {
                    ParcelsLabel = "201-225",
                    Boost = 4,
                    NoAdsMonth = 0.9399M,
                    WithAdsMonth = 3.29M,
                    WithAdsYear = 39.48M,
                    SrbYear = 88.62M
                },
                new()
                {
                    ParcelsLabel = "226-300",
                    Boost = 3,
                    NoAdsMonth = 1.25M,
                    WithAdsMonth = 3.34M,
                    WithAdsYear = 40.10M,
                    SrbYear = 105.63M
                },
                new()
                {
                    ParcelsLabel = "301-1000",
                    Boost = 2,
                    NoAdsMonth = 4.18M,
                    WithAdsMonth = 7.66M,
                    WithAdsYear = 91.90M,
                    SrbYear = 310.32M
                },
                new()
                {
                    ParcelsLabel = "3,000",
                    Boost = 2,
                    NoAdsMonth = 12.53M,
                    WithAdsMonth = 22.97M,
                    WithAdsYear = 275.70M,
                    SrbYear = 930.96M
                },
                new()
                {
                    ParcelsLabel = "6,000",
                    Boost = 2,
                    NoAdsMonth = 25.06M,
                    WithAdsMonth = 45.95M,
                    WithAdsYear = 551.40M,
                    SrbYear = 1861.91M
                },
                new()
                {
                    ParcelsLabel = "10000",
                    Boost = 2,
                    NoAdsMonth = 41.77M,
                    WithAdsMonth = 76.58M,
                    WithAdsYear = 919.00M,
                    SrbYear = 3103.19M
                },
            });

        oBoostTiers.Add("BRZ",
            new List<BoostTier>
            {
                new()
                {
                    ParcelsLabel = "1-60",
                    Boost = 20,
                    NoAdsMonth = 0.2506M,
                    WithAdsMonth = 4.22M,
                    WithAdsYear = 50.63M,
                    SrbYear = 63.73M
                },
                new()
                {
                    ParcelsLabel = "61-75",
                    Boost = 15,
                    NoAdsMonth = 0.3133M,
                    WithAdsMonth = 3.97M,
                    WithAdsYear = 47.62M,
                    SrbYear = 62.91M
                },
                new()
                {
                    ParcelsLabel = "76-100",
                    Boost = 12,
                    NoAdsMonth = 0.4177M,
                    WithAdsMonth = 4.25M,
                    WithAdsYear = 50.96M,
                    SrbYear = 72.80M
                },
                new()
                {
                    ParcelsLabel = "101-120",
                    Boost = 10,
                    NoAdsMonth = 0.5013M,
                    WithAdsMonth = 4.26M,
                    WithAdsYear = 51.13M,
                    SrbYear = 77.34M
                },
                new()
                {
                    ParcelsLabel = "121-150",
                    Boost = 8,
                    NoAdsMonth = 0.6266M,
                    WithAdsMonth = 4.28M,
                    WithAdsYear = 51.38M,
                    SrbYear = 84.14M
                },
                new()
                {
                    ParcelsLabel = "151-200",
                    Boost = 6,
                    NoAdsMonth = 0.8355M,
                    WithAdsMonth = 4.32M,
                    WithAdsYear = 51.80M,
                    SrbYear = 95.48M
                },
                new()
                {
                    ParcelsLabel = "201-250",
                    Boost = 5,
                    NoAdsMonth = 1.0443M,
                    WithAdsMonth = 4.53M,
                    WithAdsYear = 54.30M,
                    SrbYear = 108.91M
                },
                new()
                {
                    ParcelsLabel = "251-300",
                    Boost = 4,
                    NoAdsMonth = 1.25M,
                    WithAdsMonth = 4.39M,
                    WithAdsYear = 52.63M,
                    SrbYear = 118.16M
                },
                new()
                {
                    ParcelsLabel = "301-400",
                    Boost = 3,
                    NoAdsMonth = 1.67M,
                    WithAdsMonth = 4.46M,
                    WithAdsYear = 53.47M,
                    SrbYear = 140.84M
                },
                new()
                {
                    ParcelsLabel = "401-1000",
                    Boost = 2,
                    NoAdsMonth = 4.18M,
                    WithAdsMonth = 7.66M,
                    WithAdsYear = 91.90M,
                    SrbYear = 310.32M
                },
                new()
                {
                    ParcelsLabel = "3000",
                    Boost = 2,
                    NoAdsMonth = 12.53M,
                    WithAdsMonth = 22.97M,
                    WithAdsYear = 275.70M,
                    SrbYear = 930.96M
                },
                new()
                {
                    ParcelsLabel = "6000",
                    Boost = 2,
                    NoAdsMonth = 25.06M,
                    WithAdsMonth = 45.95M,
                    WithAdsYear = 551.40M,
                    SrbYear = 1861.91M
                },
                new()
                {
                    ParcelsLabel = "10000",
                    Boost = 2,
                    NoAdsMonth = 41.77M,
                    WithAdsMonth = 76.58M,
                    WithAdsYear = 919.00M,
                    SrbYear = 3103.19M
                },
            });

        oBoostTiers.Add("NOR",
            new List<BoostTier>
            {
                new()
                {
                    ParcelsLabel = "1-30",
                    Boost = 15,
                    NoAdsMonth = 0.2506M,
                    WithAdsMonth = 1.59M,
                    WithAdsYear = 19.05M,
                    SrbYear = 25.60M
                },
                new()
                {
                    ParcelsLabel = "31-50",
                    Boost = 12,
                    NoAdsMonth = 0.3133M,
                    WithAdsMonth = 2.12M,
                    WithAdsYear = 25.48M,
                    SrbYear = 36.40M
                },
                new()
                {
                    ParcelsLabel = "51-70",
                    Boost = 8,
                    NoAdsMonth = 0.4177M,
                    WithAdsMonth = 2.00M,
                    WithAdsYear = 23.98M,
                    SrbYear = 39.27M
                },
                new()
                {
                    ParcelsLabel = "71-105",
                    Boost = 5,
                    NoAdsMonth = 0.5013M,
                    WithAdsMonth = 1.90M,
                    WithAdsYear = 22.81M,
                    SrbYear = 45.74M
                },
                new()
                {
                    ParcelsLabel = "106-130",
                    Boost = 4,
                    NoAdsMonth = 0.6266M,
                    WithAdsMonth = 1.90M,
                    WithAdsYear = 22.81M,
                    SrbYear = 51.20M
                },
                new()
                {
                    ParcelsLabel = "131-150",
                    Boost = 3,
                    NoAdsMonth = 0.8355M,
                    WithAdsMonth = 1.15M,
                    WithAdsYear = 13.78M,
                    SrbYear = 46.55M
                },
                new()
                {
                    ParcelsLabel = "151-250",
                    Boost = 2,
                    NoAdsMonth = 1.0443M,
                    WithAdsMonth = 1.91M,
                    WithAdsYear = 22.97M,
                    SrbYear = 77.58M
                },
                new()
                {
                    ParcelsLabel = "251-300",
                    Boost = 2,
                    NoAdsMonth = 1.25M,
                    WithAdsMonth = 2.30M,
                    WithAdsYear = 27.57M,
                    SrbYear = 93.10M
                },
                new()
                {
                    ParcelsLabel = "301-400",
                    Boost = 2,
                    NoAdsMonth = 1.67M,
                    WithAdsMonth = 3.06M,
                    WithAdsYear = 36.76M,
                    SrbYear = 124.13M
                },
                new()
                {
                    ParcelsLabel = "401-1000",
                    Boost = 2,
                    NoAdsMonth = 4.18M,
                    WithAdsMonth = 7.66M,
                    WithAdsYear = 91.90M,
                    SrbYear = 310.32M
                },
                new()
                {
                    ParcelsLabel = "3000",
                    Boost = 2,
                    NoAdsMonth = 12.53M,
                    WithAdsMonth = 22.97M,
                    WithAdsYear = 275.70M,
                    SrbYear = 930.96M
                },
                new()
                {
                    ParcelsLabel = "6000",
                    Boost = 2,
                    NoAdsMonth = 25.06M,
                    WithAdsMonth = 45.95M,
                    WithAdsYear = 551.40M,
                    SrbYear = 1861.91M
                },
                new()
                {
                    ParcelsLabel = "10000",
                    Boost = 2,
                    NoAdsMonth = 41.77M,
                    WithAdsMonth = 76.58M,
                    WithAdsYear = 919.00M,
                    SrbYear = 3103.19M
                },
            });

        oBoostTiers.Add("THSKPLPH",
            new List<BoostTier>
            {
                new()
                {
                    ParcelsLabel = "1-30",
                    Boost = 8,
                    NoAdsMonth = 0.2506M,
                    WithAdsMonth = 1.00M,
                    WithAdsYear = 11.95M,
                    SrbYear = 18.50M
                },
                new()
                {
                    ParcelsLabel = "31-50",
                    Boost = 6,
                    NoAdsMonth = 0.3133M,
                    WithAdsMonth = 1.15M,
                    WithAdsYear = 13.78M,
                    SrbYear = 24.71M
                },
                new()
                {
                    ParcelsLabel = "51-70",
                    Boost = 4,
                    NoAdsMonth = 0.4177M,
                    WithAdsMonth = 1.30M,
                    WithAdsYear = 15.62M,
                    SrbYear = 30.91M
                },
                new()
                {
                    ParcelsLabel = "71-105",
                    Boost = 3,
                    NoAdsMonth = 0.5013M,
                    WithAdsMonth = 1.57M,
                    WithAdsYear = 18.84M,
                    SrbYear = 41.77M
                },
                new()
                {
                    ParcelsLabel = "106-130",
                    Boost = 2,
                    NoAdsMonth = 0.6266M,
                    WithAdsMonth = 1.76M,
                    WithAdsYear = 21.14M,
                    SrbYear = 49.53M
                },
                new()
                {
                    ParcelsLabel = "131-150",
                    Boost = 2,
                    NoAdsMonth = 0.8355M,
                    WithAdsMonth = 1.91M,
                    WithAdsYear = 22.97M,
                    SrbYear = 55.74M
                },
                new()
                {
                    ParcelsLabel = "151-250",
                    Boost = 2,
                    NoAdsMonth = 1.0443M,
                    WithAdsMonth = 2.68M,
                    WithAdsYear = 32.16M,
                    SrbYear = 86.77M
                },
                new()
                {
                    ParcelsLabel = "251-300",
                    Boost = 2,
                    NoAdsMonth = 1.25M,
                    WithAdsMonth = 3.06M,
                    WithAdsYear = 36.76M,
                    SrbYear = 102.29M
                },
                new()
                {
                    ParcelsLabel = "301-400",
                    Boost = 2,
                    NoAdsMonth = 1.67M,
                    WithAdsMonth = 3.83M,
                    WithAdsYear = 45.95M,
                    SrbYear = 133.32M
                },
                new()
                {
                    ParcelsLabel = "401-1000",
                    Boost = 2,
                    NoAdsMonth = 4.18M,
                    WithAdsMonth = 8.42M,
                    WithAdsYear = 101.09M,
                    SrbYear = 319.51M
                },
                new()
                {
                    ParcelsLabel = "3000",
                    Boost = 2,
                    NoAdsMonth = 12.53M,
                    WithAdsMonth = 23.74M,
                    WithAdsYear = 181.71M,
                    SrbYear = 836.97M
                },
                new()
                {
                    ParcelsLabel = "6000",
                    Boost = 2,
                    NoAdsMonth = 25.06M,
                    WithAdsMonth = 45.95M,
                    WithAdsYear = 363.42M,
                    SrbYear = 1673.94M
                },
                new()
                {
                    ParcelsLabel = "10000",
                    Boost = 2,
                    NoAdsMonth = 41.77M,
                    WithAdsMonth = 76.58M,
                    WithAdsYear = 605.70M,
                    SrbYear = 2789.90M
                },
            });

        // -------------- REGION TIERS ------------------------
        var oRegionTiers = new List<RegionTier>
        {
            new()
            {
                Key = "USA",
                Label = "United States",
                Currency = "USD",
                Countries = oRegionCountries["USA"],
                Tiers = oBoostTiers["USA"]
            },
            new()
            {
                Key = "CMW",
                Label = "UK/CA/AU+",
                Currency = "USD",
                Countries = oRegionCountries["CMW"],
                Tiers = oBoostTiers["CMW"]
            },
            new()
            {
                Key = "MEX",
                Label = "Mexico",
                Currency = "USD",
                Countries = oRegionCountries["MEX"],
                Tiers = oBoostTiers["MEX"]
            },
            new()
            {
                Key = "EUR",
                Label = "Western Europe",
                Currency = "USD",
                Countries = oRegionCountries["EUR"],
                Tiers = oBoostTiers["EUR"],
            },
            new()
            {
                Key = "AME",
                Label = "Asia & Middle East",
                Currency = "USD",
                Countries = oRegionCountries["AME"],
                Tiers = oBoostTiers["AME"],
            },
            new()
            {
                Key = "BRZ",
                Label = "Brazil",
                Currency = "USD",
                Countries = oRegionCountries["BRZ"],
                Tiers = oBoostTiers["BRZ"],
            },
            new()
            {
                Key = "NOR",
                Label = "Nordics +",
                Currency = "USD",
                Countries = oRegionCountries["NOR"],
                Tiers = oBoostTiers["NOR"],
            },
            new()
            {
                Key = "THSKPLPH",
                Label = "TH / SK / PL / PH",
                Currency = "USD",
                Countries = oRegionCountries["THSKPLPH"],
                Tiers = oBoostTiers["THSKPLPH"],
            },
        };

        if (!context.RegionTiers.Any())
        {
            context.RegionTiers.AddRange(oRegionTiers);
            context.SaveChanges();
        }

        if (!context.RegionCountries.Any() && !context.BoostTiers.Any())
        {
            var oRegionKeys = oRegionCountries.Keys;
            var oRegionCountryValues = oRegionCountries.Values.SelectMany(x => x);
            var oBoostTierValues = oBoostTiers.Values.SelectMany(x => x);

            foreach (var oRegionKey in oRegionKeys)
            {
                var nRegionTierId = oRegionKeys.ToList().IndexOf(oRegionKey) + 1;

                var oParallelCountries = oRegionCountryValues.AsParallel();
                oParallelCountries.ForAll(x => x.RegionTierId = nRegionTierId);

                var oParallelBoostTiers = oBoostTierValues.AsParallel();
                oParallelBoostTiers.ForAll(x => x.RegionTierId = nRegionTierId);
            }

            context.RegionCountries.AddRange(oRegionCountryValues);
            context.BoostTiers.AddRange(oBoostTierValues);
            context.SaveChanges();
        }
    }

    private void SeedResources(SqlServerContext context)
    {
        var oResourceGroups = new List<ResourceGroup>
        {
            new()
            {
                Category = "Calculators &amp; Tools",
                Description = "Make smarter decisions about which parcels to buy and how to grow your empire.",
                Items = new List<Resource>
                {
                    new()
                    {
                        Name = "Atlas Earth Calculator",
                        Url = "https://www.atlasearthcalculator.com",
                        Icon = "Calculator",
                        IconColor = "#059669",
                        IconBackground = "#ecfdf5",
                        Description =
                            "The go-to community calculator for Atlas Earth. Estimate how long it will take to earn back your investment on a parcel, compare parcel rarities, and figure out optimal Atlas Buck spending strategies. An essential tool for any serious player.",
                        Badge = "Most Used"
                    },
                    new()
                    {
                        Name = "Parcely",
                        Url = "https://parcely.app",
                        Icon = "Layers",
                        IconColor = "#2563eb",
                        IconBackground = "#eff6ff",
                        Description =
                            "A companion app and web tool for Atlas Earth that helps you track your parcel portfolio, monitor your earnings over time, and visualize your land holdings on a map. Great for players with a large number of parcels who want better visibility into their empire.",
                        Badge = "Portfolio Tracker",
                    },
                    new()
                    {
                        Name = "Atlas Gains Forecast",
                        Url = "https://atlasgains.com/forecast",
                        Icon = "ShowChart",
                        IconColor = "#2563eb",
                        IconBackground = "#eff6ff",
                        Description =
                            "This site appears to be similar to the Atlas Earth Calculator, but it also appears to have a nifty graph to help users visualize a few useful metrics.",
                        Badge = null
                    }
                }
            },
            new()
            {
                Category = "Community &amp; Discussion",
                Description = "Connect with thousands of active players, ask questions, and share strategies.",
                Items = new List<Resource>
                {
                    new()
                    {
                        Name = "r/AtlasEarth",
                        Url = "https://www.reddit.com/r/AtlasEarth/",
                        Icon = "SiReddit",
                        IconColor = "#f97316",
                        IconBackground = "#fff7ed",
                        Description =
                            "The largest community-run subreddit for Atlas Earth. A welcoming place to ask questions, share your parcel milestones, discuss strategy, and browse tips from other players. Great for finding answers to questions not covered in official docs.",
                        Badge = "Most Active",
                    },
                    new()
                    {
                        Name = "r/AtlasEarthOfficial",
                        Url = "https://www.reddit.com/r/AtlasEarthOfficial/",
                        Icon = "SiReddit",
                        IconColor = "#f97316",
                        IconBackground = "#fff7ed",
                        Description =
                            "The official subreddit maintained in partnership with Atlas Reality. This is where you'll find developer announcements, patch notes, official event posts, and responses from the Atlas Earth team.",
                        Badge = "Official",
                    },
                    new()
                    {
                        Name = "r/AtlasEarth_UnOfficial",
                        Url = "https://www.reddit.com/r/AtlasEarth_UnOfficial/",
                        Icon = "SiReddit",
                        IconColor = "#f97316",
                        IconBackground = "#fff7ed",
                        Description =
                            "An unofficial community for Atlas Earth players to chat, share tips, strategize, and discuss the game freely. Not affiliated with Atlas Reality.",
                        Badge = "Community",
                    },
                    new()
                    {
                        Name = "Official Atlas Earth Server",
                        Url = "https://discord.gg/H2qHxrf8m",
                        Icon = "SiDiscord",
                        IconColor = "#6366f1",
                        IconBackground = "#eef2ff",
                        Description =
                            "The official Atlas Earth Discord server. Join real-time chats, ask questions in dedicated help channels, participate in giveaways, and stay up to date on announcements. The Discord is one of the fastest places to get an answer from another player.",
                        Badge = "Official",
                    },
                    new()
                    {
                        Name = "Atlas Earth Community",
                        Url = "https://discord.gg/GMNtj8aDr",
                        Icon = "SiDiscord",
                        IconColor = "#6366f1",
                        IconBackground = "#eef2ff",
                        Description =
                            "An alternative community-run Atlas Earth Discord server",
                        Badge = "Community",
                    },
                    new()
                    {
                        Name = "Atlas Earth Guides",
                        Url = "https://atlasearthguides.com/",
                        Icon = "TravelExplore",
                        IconColor = "#2563eb",
                        IconBackground = "#eff6ff",
                        Description =
                            "This site has some pretty useful information about Atlas Earth, but one of my favorite things about it is the Minigame Guides. Sadly, thRacer and Fishing Guides are sort of dated now since he hasn't released a guide for the Modern versions of Racer and Fishing, only for Vintage, but they're still useful since, as the remaining Minigames are modernized, the Vintage minigames will be exclusive to Super Minigame Saturdays.",
                        Badge = null
                    },
                    new()
                    {
                        Name = "Atlas Earth Facebook Groups",
                        Url = "https://www.facebook.com/groups/search/results/?q=atlas+earth",
                        Icon = "SiFacebook",
                        IconColor = "#2563eb",
                        IconBackground = "#eff6ff",
                        Description =
                            "There are dozens of active Facebook Groups for Atlas Earth players, including regional groups and general strategy groups. Search for 'Atlas Earth' in Facebook Groups to find communities near you or focused on topics you care about.",
                        Badge = null,
                    }
                },
            },
            new()
            {
                Category = "Official Resources",
                Description =
                    "Straight from Atlas Reality — the source of truth for game rules, policies, and updates.",
                Items = new List<Resource>
                {
                    new()
                    {
                        Name = "Atlas Earth Official Website",
                        Url = "https://www.atlasearth.com",
                        Icon = "Globe2",
                        IconColor = "primary",
                        IconBackground = "primary",
                        Description =
                            "The official home of Atlas Earth. Download the app, learn about the game, read about new features, and find links to official social channels. Always check here for the most accurate and up-to-date information about the game.",
                        Badge = "Official",
                    },
                    new()
                    {
                        Name = "Atlas Earth Help Center",
                        Url = "https://atlasreality.helpshift.com/hc/en/3-atlas-earth/",
                        Icon = "MessageCircle",
                        IconColor = "primary",
                        IconBackground = "primary",
                        Description =
                            "The official support knowledge base from Atlas Reality. Covers account issues, payout problems, technical bugs, and in-depth explanations of game mechanics directly from the developers. If you have an account or payment issue, start here.",
                        Badge = "Official",
                    },
                    new()
                    {
                        Name = "Atlas Earth on YouTube",
                        Url = "https://www.youtube.com/results?search_query=atlas+earth+game",
                        Icon = "SiYoutube",
                        IconColor = "#ef4444",
                        IconBackground = "#fef2f2",
                        Description =
                            "A wealth of community-made video content covering Atlas Earth strategy, earning guides, parcel tours, and payout walkthroughs. Searching YouTube for 'Atlas Earth' surfaces a broad range of tutorials from experienced players — great for visual learners.",
                        Badge = null,
                    }
                }
            },
            new()
            {
                Category = "In-App Features Worth Knowing",
                Description =
                    "Not external links, but built-in Atlas Earth features that new players often miss.",
                Items = new List<Resource>
                {
                    new()
                    {
                        Name = "The Daily Wheel & Diamonds",
                        Url = "https = //www.atlasearth.com",
                        Icon = "Map",
                        IconColor = "#d97706",
                        IconBackground = "#fffbeb",
                        Description =
                            "New players often overlook the free Atlas Bucks available every day. The daily spin wheel, diamond collection on the map, and ad-watching rewards add up quickly. Free-to-play players who stay consistent with these mechanics can accumulate enough Atlas Bucks to buy multiple parcels per week without spending a cent.",
                        Badge = "In-App",
                    }
                }
            }
        };

        if (!context.ResourceGroups.Any())
        {
            var oResources = oResourceGroups.SelectMany(x => x.Items);
            context.ResourceGroups.AddRange(oResourceGroups);
            context.SaveChanges();

            foreach (var oResourceGroup in oResourceGroups)
            {
                var nResourceGroupId = oResourceGroup.Id;
                var oParallelResources = oResourceGroup.Items.AsParallel();
                oParallelResources.ForAll(x =>
                {
                    x.ResourceGroupId = nResourceGroupId;
                    x.Name = x.Name.Trim();
                    x.Description = x.Description.Trim();
                    x.Icon = x.Icon.Trim();
                    x.IconColor = x.IconColor.Trim();
                    x.IconBackground = x.IconBackground.Trim();
                    x.Url = x.Url.Trim();

                    if (!string.IsNullOrWhiteSpace(x.Badge))
                    {
                        x.Badge = x.Badge.Trim();
                    }
                });
            }

            context.Resources.AddRange(oResources);
            context.SaveChanges();
        }
    }
}