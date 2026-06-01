import News from "../models/News.js";
import createSlug from "../utils/createSlug.js";

const makeUniqueSlug = async (title, existingNewsId = null) => {
  const baseSlug = createSlug(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await News.findOne({ slug });

    if (
      !existing ||
      (existingNewsId && existing._id.toString() === existingNewsId.toString())
    ) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

export const getAllNews = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const keyword = req.query.search
      ? {
          $or: [
            { title: { $regex: req.query.search, $options: "i" } },
            { summary: { $regex: req.query.search, $options: "i" } },
            { content: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const categoryFilter =
      req.query.category && req.query.category !== "All"
        ? { category: req.query.category }
        : {};

    const filter = {
      published: true,
      ...keyword,
      ...categoryFilter,
    };

    const news = await News.find(filter)
      .populate("author", "name avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await News.countDocuments(filter);

    res.json({
      news,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    next(error);
  }
};

export const getTopNews = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 6;

    const news = await News.find({ published: true })
      .populate("author", "name avatar")
      .sort({ views: -1, createdAt: -1 })
      .limit(limit);

    res.json(news);
  } catch (error) {
    next(error);
  }
};

export const getNewsBySlug = async (req, res, next) => {
  try {
    const news = await News.findOne({
      slug: req.params.slug,
      published: true,
    }).populate("author", "name avatar bio");

    if (!news) {
      res.status(404);
      throw new Error("News not found");
    }

    news.views += 1;
    await news.save();

    res.json(news);
  } catch (error) {
    next(error);
  }
};

export const getMyNews = async (req, res, next) => {
  try {
    const news = await News.find({ author: req.user._id })
      .populate("author", "name avatar")
      .sort({ createdAt: -1 });

    res.json(news);
  } catch (error) {
    next(error);
  }
};

export const createNews = async (req, res, next) => {
  try {
    const { title, summary, content, category, imageUrl, published } = req.body;

    if (!title || !summary || !content || !category) {
      res.status(400);
      throw new Error("Title, summary, content and category are required");
    }

    const slug = await makeUniqueSlug(title);

    const news = await News.create({
      title,
      slug,
      summary,
      content,
      category,
      imageUrl,
      published: published ?? true,
      author: req.user._id,
    });

    const populatedNews = await news.populate("author", "name avatar");

    res.status(201).json(populatedNews);
  } catch (error) {
    next(error);
  }
};

export const updateNews = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      res.status(404);
      throw new Error("News not found");
    }

    const isOwner = news.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      res.status(403);
      throw new Error("You can update only your own news");
    }

    const { title, summary, content, category, imageUrl, published } = req.body;

    if (title && title !== news.title) {
      news.slug = await makeUniqueSlug(title, news._id);
    }

    news.title = title || news.title;
    news.summary = summary || news.summary;
    news.content = content || news.content;
    news.category = category || news.category;
    news.imageUrl = imageUrl ?? news.imageUrl;
    news.published = published ?? news.published;

    const updatedNews = await news.save();
    const populatedNews = await updatedNews.populate("author", "name avatar");

    res.json(populatedNews);
  } catch (error) {
    next(error);
  }
};

export const deleteNews = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      res.status(404);
      throw new Error("News not found");
    }

    const isOwner = news.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      res.status(403);
      throw new Error("You can delete only your own news");
    }

    await news.deleteOne();

    res.json({
      message: "News deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};