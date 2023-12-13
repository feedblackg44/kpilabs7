import logging
import sys
import os
import requests

from dotenv import load_dotenv

from aiohttp import web

from aiogram import Bot, Dispatcher, Router, types
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart, Command
from aiogram.types import Message, FSInputFile
from aiogram.utils.markdown import hbold
from aiogram.webhook.aiohttp_server import SimpleRequestHandler, setup_application


load_dotenv()

TOKEN = os.getenv("API_TOKEN")
WEB_SERVER_HOST = os.getenv("WEB_SERVER_HOST")
WEB_SERVER_PORT = int(os.getenv("WEB_SERVER_PORT"))
WEBHOOK_PREFIX = os.getenv("WEBHOOK_PREFIX")
WEBHOOK_PATH = f"/{TOKEN}/"
BASE_WEBHOOK_URL = os.getenv("BASE_WEBHOOK_URL")
WEBHOOK_CERT = os.getenv("WEBHOOK_CERT")

router = Router()


@router.message(CommandStart())
async def command_start_handler(message: Message) -> None:
    await message.answer(f"Hello, {hbold(message.from_user.full_name)}!")


@router.message(Command("get_cat_fact"))
async def command_get_current_time_handler(message: Message) -> None:
    get_fact_url = "https://catfact.ninja/fact"
    fact_json = requests.get(get_fact_url).json()
    await message.answer(f"Random cat fact: {hbold(fact_json['fact'])}")


@router.message()
async def echo_handler(message: types.Message) -> None:
    try:
        await message.answer("You said: " + hbold(message.text))
    except TypeError:
        await message.answer("Nice try!")


async def on_startup(bot: Bot) -> None:
    await bot.set_webhook(url=f"{BASE_WEBHOOK_URL}{WEBHOOK_PREFIX}{WEBHOOK_PATH}",
                          certificate=FSInputFile(WEBHOOK_CERT))


def main() -> None:
    dp = Dispatcher()
    dp.include_router(router)

    dp.startup.register(on_startup)

    bot = Bot(TOKEN, parse_mode=ParseMode.HTML)

    app = web.Application()

    webhook_requests_handler = SimpleRequestHandler(dispatcher=dp,
                                                    bot=bot)
    webhook_requests_handler.register(app, path=WEBHOOK_PATH)

    setup_application(app, dp, bot=bot)

    web.run_app(app, host=WEB_SERVER_HOST, port=WEB_SERVER_PORT)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    main()
