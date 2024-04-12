"use strict"

module.exports = (req, res, next) => {
    const { filter = {},  sort = {} }= req.query;

    const search = req.query?.search || "";
    let searchQuery = [];
    if (search) {
        searchQuery.$or= [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
        ];
    }

    let limit = Number(req.query?.limit)
    limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE)

    let page = Number(req.query?.page)
    page = page > 0 ? (page - 1) : 0

    let skip = Number(req.query?.skip)
    skip = skip > 0 ? skip : (page * limit)

    res.getModelList = async function (
        Model,
        populate = null,
    ) {
        return await Model.find({ ...filter, ...search })
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .populate(populate)
    }

    res.getModelListDetails = async (Model) => {
        const data = await Model.find({ ...filter, ...search })

        let details = {
            filter,
            search,
            sort,
            skip,
            limit,
            page,
            pages: {
                previous: page > 0 ? page : false,
                current: page + 1,
                next: page + 2,
                total: Math.ceil(data.length / limit)
            },
            totalRecords: data.length
        }
        details.pages.next = details.pages.next > details.pages.total ? false : details.pages.next
        if(details.totalRecords <= limit) details.pages = false
        return details
    }

    next()
}