import dotenv from "dotenv";
import connectDB from "./config/db.js";
import News from "./models/News.js";
import User from "./models/User.js";
import createSlug from "./utils/createSlug.js";

dotenv.config();

await connectDB();

const seed = async () => {
  try {
    await User.deleteMany();
    await News.deleteMany();

    const user = await User.create({
      name: "Demo Reporter",
      email: "demo@example.com",
      password: "123456",
      bio: "A demo journalist account for testing the news portal.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    });

    const samples = [
      {
        title:
          "Global Tech Leaders Discuss the Future of Artificial Intelligence",
        summary:
          "Industry leaders meet to discuss safe, useful and responsible AI adoption across sectors.",
        content:
          "Technology leaders gathered at a global summit to discuss how artificial intelligence can improve productivity, education, healthcare and public services. The discussion focused on responsible innovation, user privacy, transparency and long-term economic impact.",
        category: "Technology",
        imageUrl:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
        views: 120,
      },
      {
        title: "Local Football Team Wins Dramatic Final Match",
        summary:
          "A late goal in stoppage time helped the local side secure a memorable victory.",
        content:
          "The final match delivered everything fans expected: tension, speed, skill and a dramatic finish. The winning goal came during stoppage time, sending supporters into celebration.",
        category: "Sports",
        imageUrl:
          "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
        views: 98,
      },
      {
        title: "Healthcare Campaign Encourages Early Screening",
        summary:
          "Doctors urge citizens to take preventive health screening seriously.",
        content:
          "A new healthcare awareness campaign is encouraging people to attend regular screening programs. Physicians say early detection can significantly improve treatment outcomes.",
        category: "Health",
        imageUrl:
          "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200&auto=format&fit=crop",
        views: 88,
      },
      {
        title: "Small Businesses Adapt to Digital Payment Growth",
        summary:
          "Digital transactions are changing how small businesses manage daily sales.",
        content:
          "Small and medium-sized businesses are increasingly using digital payment systems to serve customers faster and keep better records.",
        category: "Business",
        imageUrl:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
        views: 75,
      },
      {
        title: "New Entertainment Festival Announces Full Lineup",
        summary:
          "Music, cinema and comedy events will be part of this year's festival.",
        content:
          "Organizers of the annual entertainment festival have announced a wide lineup featuring musicians, filmmakers, comedians and digital creators.",
        category: "Entertainment",
        imageUrl:
          "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop",
        views: 60,
      },
      {
        title: "World Leaders Meet to Discuss Climate and Trade",
        summary:
          "The meeting focused on cooperation, green investment and sustainable trade.",
        content:
          "World leaders met for a high-level discussion on climate policy, global trade and economic cooperation.",
        category: "World",
        imageUrl:
          "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1200&auto=format&fit=crop",
        views: 110,
      },
    ];

    const newsDocs = samples.map((item, index) => ({
      ...item,
      slug: `${createSlug(item.title)}-${index + 1}`,
      author: user._id,
      published: true,
    }));

    await News.insertMany(newsDocs);

    console.log("Seed completed successfully");
    console.log("Demo login: demo@example.com / 123456");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();