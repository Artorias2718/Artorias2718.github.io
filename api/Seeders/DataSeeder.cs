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
                        Answer = "Yes, 100%. While you can spend real money to buy in-game currency, you can play entirely for free by collecting diamonds on the map, spinning the daily wheel, and watching ads for free Atlas Bucks."
                    },
                    new()
                    {
                        Question = "How do I download Atlas Earth?",
                        Answer = "Atlas Earth is available on both the Apple App Store for iOS devices and the Google Play Store for Android devices."
                    },
                    new()
                    {
                        Question = "What is a parcel?",
                        Answer = "A parcel is a 30ft x 30ft square of virtual land that corresponds to a real-world location. When you buy a parcel, you own that specific piece of the Atlas Earth map."
                    },
                    new()
                    {
                        Question = "What are Atlas Bucks?",
                        Answer = "Atlas Bucks (AB) are the primary in-game currency used to purchase parcels of land and badges. 100 AB buys 1 parcel of land."
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
                        Answer = "Open the app, go to the map screen, tap 'Buy Land', and select any available green square around your current physical location. You must be physically near a parcel to buy it."
                    },
                    new()
                    {
                        Question = "What does it cost to buy a parcel?",
                        Answer = "Every parcel costs exactly 100 Atlas Bucks, regardless of its location or rarity."
                    },
                    new()
                    {
                        Question = "Can I buy parcels anywhere in the world?",
                        Answer = "You can only buy parcels within your immediate physical vicinity. You have to travel to a location to buy land there."
                    },
                    new()
                    {
                        Question = "What happens if someone already owns a parcel I want?",
                        Answer = "If a parcel is red on the map, it is owned by someone else. You cannot buy it unless they explicitly list it for sale."
                    },
                    new()
                    {
                        Question = "How many parcels can I own?",
                        Answer = "There is no limit to how many parcels you can own, though your rent boost multiplier will decrease as you hit certain parcel count milestones."
                    },
                    new()
                    {
                        Question = "Can I sell my parcels?",
                        Answer = "Unfortunately, due to excessive player abuse, the parcel sale feature was rolled back on September 2025."
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
                        Answer = "Earnings are slow. A free-to-play player who stays boosted consistently might make $150-$200 in their first year. It is not a way to get rich or replace a job; treat it as a game that occasionally buys you a coffee."
                    },
                    new()
                    {
                        Question = "How do payouts work?",
                        Answer = "Once you reach the minimum threshold, you can cash out your accrued virtual rent via PayPal, various gift cards, or bank transfer (depending on your region)."
                    },
                    new()
                    {
                        Question = "What is the minimum payout threshold?",
                        Answer = "The minimum amount you can cash out is $5.00 USD."
                    },
                    new()
                    {
                        Question = "How long does it take to get a payout?",
                        Answer = "Most payouts are processed almost instantly, though bank transfers or PayPal can sometimes take up to 48 hours to clear."
                    },
                    new()
                    {
                        Question = "Are earnings taxable?",
                        Answer = "If you cash out more than $2,000 USD in a calendar year, Atlas Reality requires you to fill out a W-9 tax form (in the US). Consult a tax professional regarding your specific situation."
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
                        Answer = "Atlas Bucks (AB) are used to buy land and badges. Virtual Rent is the currency representing your accrued rent (the micro-fractions of a cent generated by your land) which converts directly to real USD."
                    },
                    new()
                    {
                        Question = "Is there a referral program?",
                        Answer = "Atlas Reality sunset their referral program at the end of January 2026. It is no longer active. There is no longer a way to earn passive income by referring other players."
                    },
                    new()
                    {
                        Question = "What are badges and how do I earn them?",
                        Answer = "Badges are collectibles for specific cities, states, and countries. Buying a badge costs 200 AB and provides a permanent percentage boost to your overall rent generation across all your parcels."
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
                        Answer = "No. The location of a parcel has absolutely no effect on its rarity or rent generation. A parcel in Times Square has the exact same odds of being Legendary as a parcel in an empty field."
                    },
                    new()
                    {
                        Question = "What are Atlas Landmarks?",
                        Answer = "Landmarks are special, recognizable real-world locations (like the Statue of Liberty) made up of <strong>x</strong> amount of <strong>Common Parcels</strong>. They cannot be purchased like standard parcels. Instead, Landmark bids will run as Events, and every Landmark will start at <strong>100 ABs</strong>. Players must bid using <strong>Bid Tokens</strong>. Every bid will increase the price by 1AB, and in the end, the player who puts the final bid token wins the opportunity to buy the Landmark for the final bid price. Players must submit a minimum of 1 bid token within the first 24 hours of the event to be allowed to participate in Phase 2 of the bid. So far, there have been 2 Beta Landmark Events: Canada featured <strong>Peggy's Cove Lighthouse</strong> in <strong>Nova Scotia</strong>, and the US featured <strong>Jackson Square</strong> in <strong>New Orleans</strong>. Landmark owners will earn <strong>10 ABs</strong> from Landmark badge sales"
                    },
                    new()
                    {
                        Question = "Can I buy Bid Tokens?",
                        Answer = "At this time, Bid Tokens cannot be purchased. As you may know, the Diamond Wheel and Monthly Challenges had a recent update in May 2026 to replace Diamond rewards with Bid Tokens. Artorias2718 reached out to support and asked them if they would consider allowing players to purchase one Bid Token per day from the Game and/or Web App Shops. and even to the paid Explorers Club Daily Login on Bonus Days, where the current Bonus Day ABs would be totaled up on the left column, and the right column would display x amount of Bid Tokens. While Atlas Support told him these sound like great ideas, they did not confirm whether or not they would implement them."
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
                        Answer = "You don't get to choose parcel rarity—it's randomly generated when you buy it. The strategy is simply to buy as many parcels as possible and let the odds (50% Common, 30% Rare, 15% Epic, 5% Legendary) play out."
                    },
                    new()
                    {
                        Question = "How do I find the best parcels to buy?",
                        Answer = "Because rarity is entirely random and determined at the moment of purchase, there is no way to 'find' better parcels. It's pure luck."
                    },
                    new()
                    {
                        Question = "Is it worth using real money to buy Atlas Bucks?",
                        Answer = "Generally, no. The Return on Investment (ROI) for buying AB with real money takes years. The best way to play is free-to-play, or by signing up for the Explorer Club if you are a dedicated player."
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
                        Answer = "The most active community is on Reddit at r/AtlasEarthOfficial. There are also several large Facebook groups dedicated to players sharing strategies."
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
                        Answer = "You can contact support directly through the settings menu in the app, or via the Atlas Reality website's help center."
                    },
                    new()
                    {
                        Question = "Is Atlas Earth a scam?",
                        Answer = "No. It is a legitimate game that actually pays out. However, you should not view it as an investment or a source of income. It is an ad-revenue sharing app gamified as virtual real estate."
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
}